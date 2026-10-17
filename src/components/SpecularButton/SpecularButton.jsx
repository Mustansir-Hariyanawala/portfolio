import Specular from "../Specular/Specular";

import "./SpecularButton.css";

const SIZES = ["sm", "md", "lg"];

/**
 * The site's main call-to-action button: a pill with an optional tint and
 * the specular edge effect. Effect props (lineColor, baseColor, intensity,
 * shineSize, shineFade, thickness, speed, followMouse, proximity,
 * autoAnimate) are passed through to <Specular>.
 */
function SpecularButton({
  children = "Get Started",
  size = "lg",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 0,
  textColor = "#f5f5f5",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ...effect
}) {
  const sizeClass = `specular-button--${SIZES.includes(size) ? size : "md"}`;

  return (
    <Specular
      as="button"
      type={type}
      disabled={disabled}
      onClick={onClick}
      radius={radius}
      className={`specular-button ${sizeClass} ${className}`}
      style={{
        "--sb-radius": `${radius}px`,
        "--sb-tint": tint,
        "--sb-tint-opacity": tintOpacity,
        "--sb-blur": `${blur}px`,
        "--sb-text-color": textColor,
      }}
      {...effect}
    >
      <span className="specular-button-label">
        {children}
      </span>
    </Specular>
  );
}

export default SpecularButton;
