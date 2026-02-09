import type { Annotation } from "./types";

/**
 * Inject <mark> tags into an HTML string based on annotations for a given spread.
 * Offsets are character positions in the plain-text content (tags stripped).
 *
 * Uses DOMParser to properly handle HTML entities and tag boundaries.
 */
export function applyHighlights(
  html: string,
  spreadIdx: number,
  annotations: Annotation[],
): string {
  const matching = annotations
    .filter((a) => a.spreadIdx === spreadIdx)
    .sort((a, b) => a.startOffset - b.startOffset || b.endOffset - a.endOffset);

  if (matching.length === 0) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const container = doc.body;

  // Collect all text nodes with their plain-text offset ranges
  const textNodes: { node: Text; start: number; end: number }[] = [];
  const walker = doc.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const len = node.textContent?.length ?? 0;
    textNodes.push({ node, start: offset, end: offset + len });
    offset += len;
  }

  // Apply annotations in reverse order to keep earlier nodes stable
  for (let i = matching.length - 1; i >= 0; i--) {
    const ann = matching[i]!;
    const annStart = Math.max(0, ann.startOffset);
    const annEnd = Math.min(offset, ann.endOffset);
    if (annStart >= annEnd) continue;

    // Find all text nodes that overlap this annotation
    for (let t = textNodes.length - 1; t >= 0; t--) {
      const tn = textNodes[t]!;
      const overlapStart = Math.max(annStart, tn.start);
      const overlapEnd = Math.min(annEnd, tn.end);
      if (overlapStart >= overlapEnd) continue;

      const localStart = overlapStart - tn.start;
      const localEnd = overlapEnd - tn.start;

      // Split the text node to isolate the highlighted range
      const textNode = tn.node;
      const before = textNode.textContent!.slice(0, localStart);
      const middle = textNode.textContent!.slice(localStart, localEnd);
      const after = textNode.textContent!.slice(localEnd);

      const mark = doc.createElement("mark");
      mark.setAttribute("data-annotation-id", ann.id);
      mark.setAttribute("data-color", ann.color);
      if (ann.comment) mark.setAttribute("data-has-comment", "true");
      mark.textContent = middle;

      const parent = textNode.parentNode!;
      if (after) parent.insertBefore(doc.createTextNode(after), textNode.nextSibling);
      parent.insertBefore(mark, textNode.nextSibling);
      textNode.textContent = before;
    }
  }

  return container.innerHTML;
}
