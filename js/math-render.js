const KATEX_DELIMITERS = [
  { left: "$$", right: "$$", display: true },
  { left: "$", right: "$", display: false },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\[", right: "\\]", display: true }
];

export function renderBlogMath(root = document) {
  if (typeof renderMathInElement !== "function") return;

  const targets = root.matches?.(".markdown-body")
    ? [root]
    : root.querySelectorAll(".markdown-body, .editor-preview, .editor-preview-side");

  targets.forEach((element) => {
    renderMathInElement(element, {
      delimiters: KATEX_DELIMITERS,
      throwOnError: false,
      strict: "ignore"
    });
  });
}
