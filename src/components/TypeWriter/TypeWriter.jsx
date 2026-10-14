import { useEffect, useState } from "react";

import "./TypeWriter.css";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Types `text` out one character at a time, then leaves a blinking cursor
 * at the end.
 *
 * The untyped remainder is rendered invisibly instead of being left out,
 * so the text keeps its final size and line breaks from the first frame.
 * Without that, the heading would grow as it types and a long word could
 * jump to the next line partway through.
 *
 * The output is aria-hidden; give the parent element an aria-label with
 * the full text so screen readers read it once instead of letter by letter.
 */
function TypeWriter({ text, speed = 80, startDelay = 400 }) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  const isTyping = count < text.length;

  useEffect(() => {
    if (!isTyping) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed);
    return () => clearTimeout(timer);
  }, [count, isTyping, speed, startDelay]);

  return (
    <span className="typewriter" aria-hidden="true">
      {text.slice(0, count)}
      <span className={`typewriter-cursor ${isTyping ? "is-typing" : ""}`} />
      <span className="typewriter-rest">{text.slice(count)}</span>
    </span>
  );
}

export default TypeWriter;
