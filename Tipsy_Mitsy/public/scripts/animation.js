function wrapChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const spans = [];
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";

    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
    spans.push(span);
  }
  return spans;
}

document.addEventListener("DOMContentLoaded", () => {
  const target =
    document.querySelector(".text") ||
    document.querySelector(".js-animated-words") ||
    document.querySelector("h1");

  if (!target) {
    console.warn(
      "No target found: add class .text or .js-animated-words or an <h1> element."
    );
    return;
  }

  const chars = wrapChars(target);

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.to(chars, { duration: 0.5, color: "#e6e759", stagger: 0.05 });
  tl.to(chars, { duration: 0.25, color: "#80e5e3", stagger: 0.025 }, ">-25%");
  tl.to(chars, { duration: 0.25, color: "#ffffff", stagger: 0.025 }, ">-25%");
});
