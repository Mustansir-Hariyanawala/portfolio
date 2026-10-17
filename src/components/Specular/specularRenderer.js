// One shared WebGL2 context that draws the specular edge for every
// <Specular> element on the page.
//
// Browsers only allow ~16 live WebGL contexts, so a context per element would
// start losing old ones as soon as a page has more than a handful. Instead
// each element gets a plain 2D canvas: the shared context renders the effect
// for one element at a time and the result is copied into that element's
// canvas. Elements that are off-screen, or idle (no shine because the pointer
// is far away), are skipped entirely, so dozens of them cost almost nothing.

// Extra room around the element so the glow isn't clipped (px).
export const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both
  // catch a streak. The angular window (size + fade) is measured with an
  // elliptical normal so it varies continuously along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

// element -> instance
const instances = new Map();

// Bumped whenever element positions or the pointer may have changed, so
// rects are only re-measured when needed.
let layoutVersion = 0;
const pointer = { x: 0, y: 0, seen: false, version: 0 };

let gl = null;
let uniforms = null;
let frame = 0;
let lastTime = 0;
let visibility = null;

function hexToRgb(hex) {
  let value = hex.replace("#", "");

  if (value.length === 3) {
    value = [...value].map((c) => c + c).join("");
  }

  const number = parseInt(value, 16);

  return [(number >> 16) / 255, ((number >> 8) & 255) / 255, (number & 255) / 255];
}

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function setUpGl() {
  const canvas = document.createElement("canvas");

  gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
  });

  if (!gl) {
    return false;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  gl.useProgram(program);

  // One triangle that covers the whole viewport
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  uniforms = {};
  for (const name of [
    "uCenter", "uHalfSize", "uRadius", "uAngle", "uPx", "uLineColor", "uBaseColor",
    "uIntensity", "uShineSize", "uShineFade", "uThickness", "uBaseWidth",
  ]) {
    uniforms[name] = gl.getUniformLocation(program, name);
  }

  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.SCISSOR_TEST);

  return true;
}

function bumpLayout() {
  layoutVersion++;
}

function onPointerMove(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.seen = true;
  pointer.version++;
}

// Re-reads the element's box and the pointer's position relative to it.
function measure(instance) {
  const { el, options } = instance;
  const rect = el.getBoundingClientRect();

  instance.width = rect.width;
  instance.height = rect.height;

  if (!pointer.seen) {
    return;
  }

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
  const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
  const distance = Math.hypot(dx, dy);

  // Over the element itself the light settles on the diagonal (framing the
  // corners) and gently sways with the cursor position within it.
  if (distance === 0) {
    const nx = (pointer.x - cx) / (rect.width / 2);
    const ny = (cy - pointer.y) / (rect.height / 2);
    instance.pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
  } else {
    instance.pointerAngle = Math.atan2(cy - pointer.y, pointer.x - cx);
  }

  const t = Math.max(0, 1 - distance / Math.max(options.current.proximity, 1));
  instance.proximity = t * t * (3 - 2 * t);
}

function draw(instance) {
  const options = instance.options.current;
  const dpr = window.devicePixelRatio || 1;

  const width = Math.max(1, Math.round((instance.width + PAD * 2) * dpr));
  const height = Math.max(1, Math.round((instance.height + PAD * 2) * dpr));

  // The element's own canvas
  if (instance.canvas.width !== width || instance.canvas.height !== height) {
    instance.canvas.width = width;
    instance.canvas.height = height;
  }

  // The shared canvas only ever grows; each element uses its bottom-left
  // corner (WebGL's origin).
  const shared = gl.canvas;
  if (shared.width < width || shared.height < height) {
    shared.width = Math.max(shared.width, width);
    shared.height = Math.max(shared.height, height);
  }

  const radius = options.radius ?? instance.computedRadius;

  gl.viewport(0, 0, width, height);
  gl.scissor(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform2f(uniforms.uCenter, (PAD + instance.width / 2) * dpr, (PAD + instance.height / 2) * dpr);
  gl.uniform2f(uniforms.uHalfSize, (instance.width / 2) * dpr, (instance.height / 2) * dpr);
  gl.uniform1f(uniforms.uRadius, Math.min(radius, Math.min(instance.width, instance.height) / 2) * dpr);
  gl.uniform1f(uniforms.uAngle, instance.angle);
  gl.uniform1f(uniforms.uPx, dpr);
  gl.uniform3fv(uniforms.uLineColor, hexToRgb(options.lineColor));
  gl.uniform3fv(uniforms.uBaseColor, hexToRgb(options.baseColor));
  gl.uniform1f(uniforms.uIntensity, options.intensity * instance.bright);
  gl.uniform1f(uniforms.uShineSize, (options.shineSize * Math.PI) / 180);
  gl.uniform1f(uniforms.uShineFade, (options.shineFade * Math.PI) / 180);
  gl.uniform1f(uniforms.uThickness, options.thickness * dpr);
  gl.uniform1f(uniforms.uBaseWidth, dpr);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  instance.context.clearRect(0, 0, width, height);
  instance.context.drawImage(shared, 0, shared.height - height, width, height, 0, 0, width, height);
}

function tick(now) {
  frame = requestAnimationFrame(tick);

  const elapsed = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  for (const instance of instances.values()) {
    if (!instance.visible) {
      continue;
    }

    const options = instance.options.current;

    if (instance.layoutVersion !== layoutVersion || instance.pointerVersion !== pointer.version) {
      instance.layoutVersion = layoutVersion;
      instance.pointerVersion = pointer.version;
      measure(instance);
    }

    // Light angle steers toward the pointer and falls back to a slow sweep
    // when the pointer hasn't moved yet.
    instance.idleAngle += options.speed * elapsed;

    const steer = options.followMouse && instance.pointerAngle != null
      && (!options.autoAnimate || instance.proximity > 0);
    const target = steer ? instance.pointerAngle : instance.idleAngle;
    const diff = ((target - instance.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    instance.angle += diff * (1 - Math.exp(-elapsed * 7));

    // Shine fades in with pointer proximity unless autoAnimate keeps it on
    const brightTarget = options.autoAnimate ? 1 : instance.proximity;
    instance.bright += (brightTarget - instance.bright) * (1 - Math.exp(-elapsed * 8));

    // Idle elements only need their static base stroke drawn once.
    const idle = instance.bright < 0.002 && !options.autoAnimate;

    if (idle && instance.drawnIdle) {
      continue;
    }

    draw(instance);
    instance.drawnIdle = idle;
  }
}

/**
 * Starts drawing the effect for `el` into a canvas appended to `fxHost`.
 * `options` is a ref whose `.current` holds the effect settings, so they can
 * change without re-registering. Returns a cleanup function.
 */
export function registerSpecular(el, fxHost, options) {
  if (!gl && !setUpGl()) {
    return () => {};
  }

  const canvas = document.createElement("canvas");
  fxHost.appendChild(canvas);

  const instance = {
    el,
    options,
    canvas,
    context: canvas.getContext("2d"),
    visible: false,
    width: 1,
    height: 1,
    computedRadius: 0,
    angle: 2.4,
    idleAngle: 2.4,
    bright: 0,
    proximity: 0,
    pointerAngle: null,
    layoutVersion: -1,
    pointerVersion: -1,
    drawnIdle: false,
  };

  // Size changes: re-measure and redraw. Without an explicit radius the
  // element's own border-radius is used.
  const resizeObserver = new ResizeObserver(() => {
    instance.computedRadius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    instance.layoutVersion = -1;
    instance.drawnIdle = false;
  });
  resizeObserver.observe(el);

  if (instances.size === 0) {
    visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const match = instances.get(entry.target);

        if (match) {
          match.visible = entry.isIntersecting;
          match.layoutVersion = -1;
        }
      }
    }, { rootMargin: "100px" });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // Capture so scrolling inside any scroller (e.g. the carousel) counts.
    window.addEventListener("scroll", bumpLayout, { capture: true, passive: true });
    window.addEventListener("resize", bumpLayout);

    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  }

  instances.set(el, instance);
  visibility.observe(el);

  return () => {
    instances.delete(el);
    visibility.unobserve(el);
    resizeObserver.disconnect();
    canvas.remove();

    if (instances.size === 0) {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", bumpLayout, { capture: true });
      window.removeEventListener("resize", bumpLayout);
    }
  };
}
