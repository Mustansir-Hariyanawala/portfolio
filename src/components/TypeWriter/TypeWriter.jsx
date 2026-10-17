import { Fragment, useEffect, useState } from "react";

import "./TypeWriter.css";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Types `text` out one character at a time, then leaves a blinking cursor
 * at the end.
 *
 * `text` is a string, or an array of parts where a part is a string or
 * `{ text, em: true }` for an italic accent word, e.g.
 * `["About ", { text: "Me", em: true }]`.
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
  const parts = (Array.isArray(text) ? text : [text])
    .filter(Boolean)
    .map((part) => (typeof part === "string" ? { text: part } : part));

  const total = parts.reduce((sum, part) => sum + part.text.length, 0);

  const [count, setCount] = useState(() => (prefersReducedMotion() ? total : 0));

  const isTyping = count < total;

  useEffect(() => {
    if (!isTyping) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed);
    return () => clearTimeout(timer);
  }, [count, isTyping, speed, startDelay]);

  // How many characters of each part are typed so far.
  const shown = [];
  let start = 0;
  for (const part of parts) {
    shown.push(Math.max(0, Math.min(count - start, part.text.length)));
    start += part.text.length;
  }

  // The cursor goes in the part currently being typed (or the last part once
  // everything is typed), so it picks up that part's styling.
  const typingIndex = shown.findIndex((typed, index) => typed < parts[index].text.length);
  const cursorIndex = typingIndex === -1 ? parts.length - 1 : typingIndex;

  return (
    <span className="typewriter" aria-hidden="true">
      {parts.map((part, index) => {
        const Wrapper = part.em ? "em" : Fragment;

        return (
          <Wrapper key={index}>
            {part.text.slice(0, shown[index])}
            {index === cursorIndex && (
              <span className={`typewriter-cursor ${isTyping ? "is-typing" : ""}`} />
            )}
            <span className="typewriter-rest">{part.text.slice(shown[index])}</span>
          </Wrapper>
        );
      })}
    </span>
  );
}

export default TypeWriter;
