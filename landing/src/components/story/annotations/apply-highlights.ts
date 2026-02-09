import type { Annotation } from "./types";

/**
 * Inject <mark> tags into an HTML string based on annotations for a given spread.
 * Offsets are character positions in the plain-text content (tags stripped).
 *
 * Works by mapping plain-text char indices to positions in the HTML string,
 * then inserting <mark>...</mark> at the right spots. Handles annotations
 * that span across HTML tags naturally.
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

  // Build a map: plainTextIndex → htmlIndex
  // Walk the HTML string, track when we're inside a tag vs text content
  const textToHtml: number[] = []; // textToHtml[plainIdx] = position in html string
  let inTag = false;
  let textIdx = 0;

  for (let i = 0; i < html.length; i++) {
    if (html[i] === "<") {
      inTag = true;
      continue;
    }
    if (html[i] === ">") {
      inTag = false;
      continue;
    }
    if (!inTag) {
      textToHtml[textIdx] = i;
      textIdx++;
    }
  }
  // Sentinel: position after last text char (for end offsets at the very end)
  textToHtml[textIdx] = html.length;

  // Insert marks in reverse order to preserve positions
  let result = html;
  for (let i = matching.length - 1; i >= 0; i--) {
    const ann = matching[i]!;
    const start = ann.startOffset;
    const end = ann.endOffset;

    // Clamp to available text
    if (start >= textIdx || end <= 0) continue;
    const clampedStart = Math.max(0, start);
    const clampedEnd = Math.min(textIdx, end);

    const htmlStart = textToHtml[clampedStart];
    const htmlEnd = textToHtml[clampedEnd];
    if (htmlStart === undefined || htmlEnd === undefined) continue;

    const attrs = `data-annotation-id="${ann.id}" data-color="${ann.color}"${ann.comment ? ' data-has-comment="true"' : ""}`;
    result =
      result.slice(0, htmlStart) +
      `<mark ${attrs}>` +
      result.slice(htmlStart, htmlEnd) +
      "</mark>" +
      result.slice(htmlEnd);
  }

  return result;
}
