const WIDGET_BLOCK_REGEX = /```widget\s*\n([\s\S]*?)```/g;

export function preprocessWidgetBlocks(markdown) {
  if (!markdown || typeof markdown !== "string") return markdown;

  return markdown.replace(WIDGET_BLOCK_REGEX, (_, blockBody) => {
    if (blockBody.trim().startsWith("<")) {
      return blockBody;
    }

    const lines = blockBody
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const widgetName = lines[0];
    if (!widgetName) return "";

    const safeWidgetName = widgetName.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!safeWidgetName) return "";

    return `<div class="blog-widget" data-widget="${safeWidgetName}"></div>`;
  });
}

function restoreSavedSegments(markdown, saved) {
  return markdown.replace(/%%SAVE(\d+)%%/g, (_, index) => saved[Number(index)] ?? "");
}

export function protectMath(markdown) {
  const mathStore = [];
  const saved = [];
  let processed = markdown;

  processed = processed.replace(/```[\s\S]*?```/g, (match) => {
    saved.push(match);
    return `%%SAVE${saved.length - 1}%%`;
  });

  processed = processed.replace(/`[^`\n]+`/g, (match) => {
    saved.push(match);
    return `%%SAVE${saved.length - 1}%%`;
  });

  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, tex) => {
    const id = mathStore.length;
    mathStore.push({ display: true, tex: tex.trim() });
    return `%%MATH${id}%%`;
  });

  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, tex) => {
    const id = mathStore.length;
    mathStore.push({ display: false, tex: tex.trim() });
    return `%%MATH${id}%%`;
  });

  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => {
    const id = mathStore.length;
    mathStore.push({ display: true, tex: tex.trim() });
    return `%%MATH${id}%%`;
  });

  processed = processed.replace(/(?<!\$)\$(?!\$)((?:\\.|[^$\n\\])+?)\$(?!\$)/g, (_, tex) => {
    const id = mathStore.length;
    mathStore.push({ display: false, tex: tex.trim() });
    return `%%MATH${id}%%`;
  });

  processed = restoreSavedSegments(processed, saved);
  return { markdown: processed, mathStore };
}

export function restoreMath(html, mathStore) {
  return html.replace(/%%MATH(\d+)%%/g, (_, id) => {
    const item = mathStore[Number(id)];
    if (!item) return "";

    if (item.display) {
      return `<div class="math-display">$$${item.tex}$$</div>`;
    }

    return `$${item.tex}$`;
  });
}

export function parseBlogMarkdown(content, markedParser = null) {
  const markedFn = markedParser || (typeof marked !== "undefined" ? marked.parse.bind(marked) : null);
  if (!markedFn) {
    throw new Error("marked is required to parse blog markdown");
  }

  const withWidgets = preprocessWidgetBlocks(content);
  const { markdown, mathStore } = protectMath(withWidgets);
  const html = markedFn(markdown);
  return restoreMath(html, mathStore);
}
