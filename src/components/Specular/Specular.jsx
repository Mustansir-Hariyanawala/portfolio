import { useEffect, useRef } from "react";

import { registerSpecular } from "./specularRenderer";

import "./Specular.css";

/**
 * Adds the specular edge effect (a light streak along the border that follows
 * the pointer) to any element. Renders `as` (default "div") with the given
 * className and props, so it can stand in for a skill box, a chip, a link or
 * a button. The border radius is read from the element's CSS unless `radius`
 * is given.
 *
 * All instances share one WebGL context (see specularRenderer.js).
 */
function Specular({
  as: Tag = "div",
  className = "",
  children,
  radius,
  lineColor = "#ffffff",
  baseColor = "#525252",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  ...rest
}) {
  const hostRef = useRef(null);
  const fxRef = useRef(null);
  const optionsRef = useRef(null);

  // Runs before the registration effect below, so the renderer always sees
  // the latest options.
  useEffect(() => {
    optionsRef.current = {
      radius, lineColor, baseColor, intensity, shineSize, shineFade,
      thickness, speed, followMouse, proximity, autoAnimate,
    };
  });

  useEffect(() => registerSpecular(hostRef.current, fxRef.current, optionsRef), []);

  return (
    <Tag
      ref={hostRef}
      className={`specular ${className}`}
      {...rest}
    >
      <span
        ref={fxRef}
        className="specular-fx"
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}

export default Specular;
