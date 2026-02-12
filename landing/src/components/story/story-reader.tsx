"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnnotations } from "./annotations/use-annotations";
import { getSelectionOffsets } from "./annotations/use-text-selection";
import { AnnotationTooltip } from "./annotations/annotation-tooltip";
import { CommentPopover } from "./annotations/comment-popover";
import type { Annotation } from "./annotations/types";

interface Spread {
  imageHtml: string | null;
  imageSrc: string | null;
  textHtml: string;
}

function parseSpreads(container: HTMLElement): Spread[] {
  const spreads: Spread[] = [];
  let current: { imageHtml: string | null; imageSrc: string | null; parts: string[] } | null = null;

  for (const node of Array.from(container.children)) {
    const el = node as HTMLElement;
    const img = el.tagName === "IMG" ? (el as HTMLImageElement) : el.querySelector("img");

    if (img) {
      if (current) spreads.push({ imageHtml: current.imageHtml, imageSrc: current.imageSrc, textHtml: current.parts.join("") });
      current = { imageHtml: el.outerHTML, imageSrc: img.src, parts: [] };
    } else {
      const html = el.outerHTML;
      if (!html.trim()) continue;
      if (!current) {
        current = { imageHtml: null, imageSrc: null, parts: [html] };
      } else {
        current.parts.push(html);
      }
    }
  }

  if (current) spreads.push({ imageHtml: current.imageHtml, imageSrc: current.imageSrc, textHtml: current.parts.join("") });

  if (spreads.length > 1 && spreads[0] && !spreads[0].imageHtml && spreads[1]) {
    spreads[1].textHtml = spreads[0].textHtml + spreads[1].textHtml;
    spreads.shift();
  }

  return spreads;
}

interface StoryReaderProps {
  children: ReactNode;
  title: string;
  backHref: string;
  backLabel: string;
  storySlug: string;
  locale: string;
}

export function StoryReader({ children, title, backHref, backLabel, storySlug, locale }: StoryReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [textEl, setTextEl] = useState<HTMLDivElement | null>(null);
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [current, setCurrent] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const barRef = useRef<HTMLDivElement>(null);
  const lastSelectionRef = useRef<{ startOffset: number; endOffset: number } | null>(null);

  // Annotation system
  const { annotations, create, update, remove, getHighlightedHtml } = useAnnotations(storySlug, locale);

  // Tooltip state — offsets snapshotted at creation time
  const [tooltip, setTooltip] = useState<{
    rect: DOMRect;
    startOffset?: number;
    endOffset?: number;
    existingAnnotation?: Annotation;
  } | null>(null);
  const [commentPopover, setCommentPopover] = useState<{
    rect: DOMRect;
    startOffset?: number;
    endOffset?: number;
    annotationId?: string | undefined;
    initialComment?: string | undefined;
  } | null>(null);

  // Desktop: right-click on selected text → annotation tooltip
  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (!textEl) return;
      const sel = getSelectionOffsets(textEl);
      if (!sel) return;
      e.preventDefault();
      setTooltip({
        rect: sel.rect,
        startOffset: sel.startOffset,
        endOffset: sel.endOffset,
      });
    },
    [textEl],
  );

  // Mobile: selectionchange toggles DOM attribute on the bar (no React state, no re-render)
  // Offsets stored in a ref so button handlers can use them even after selection collapses
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) return;
    if (!textEl) return;

    function onSelectionChange() {
      const sel = getSelectionOffsets(textEl!);
      if (sel) {
        lastSelectionRef.current = { startOffset: sel.startOffset, endOffset: sel.endOffset };
        barRef.current?.setAttribute("data-has-selection", "true");
      } else {
        barRef.current?.setAttribute("data-has-selection", "false");
      }
    }

    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, [textEl]);

  // Mobile: snapshot selection on pointerdown (before tap collapses it)
  const snapshotSelection = useCallback(() => {
    if (!textEl) return;
    const sel = getSelectionOffsets(textEl);
    if (sel) lastSelectionRef.current = { startOffset: sel.startOffset, endOffset: sel.endOffset };
  }, [textEl]);

  const onMobileColorPick = useCallback(
    async (color: "red" | "yellow" | "green" | "blue") => {
      const offsets = lastSelectionRef.current;
      if (!offsets) return;
      await create({
        spreadIdx: current,
        startOffset: offsets.startOffset,
        endOffset: offsets.endOffset,
        color,
      });
      lastSelectionRef.current = null;
      barRef.current?.setAttribute("data-has-selection", "false");
      window.getSelection()?.removeAllRanges();
    },
    [current, create],
  );

  const onMobileComment = useCallback(() => {
    const offsets = lastSelectionRef.current;
    if (!offsets || !textEl) return;
    const rect = window.getSelection()?.getRangeAt(0)?.getBoundingClientRect();
    setCommentPopover({
      rect: rect || new DOMRect(window.innerWidth / 2, window.innerHeight / 2, 0, 0),
      startOffset: offsets.startOffset,
      endOffset: offsets.endOffset,
    });
    lastSelectionRef.current = null;
    barRef.current?.setAttribute("data-has-selection", "false");
  }, [textEl]);

  useEffect(() => {
    if (!contentRef.current) return;
    const parsed = parseSpreads(contentRef.current);
    setSpreads(parsed);
  }, []);

  // Preload adjacent images (2 ahead, 1 behind)
  useEffect(() => {
    if (spreads.length === 0) return;
    const toPreload = [current - 1, current + 1, current + 2];
    for (const idx of toPreload) {
      const src = spreads[idx]?.imageSrc;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    }
  }, [current, spreads]);

  const dismissAnnotationUI = useCallback(() => {
    setTooltip(null);
    setCommentPopover(null);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0 || next >= spreads.length) return c;
        return next;
      });
      dismissAnnotationUI();
      if (textEl) textEl.scrollTop = 0;
    },
    [spreads.length, dismissAnnotationUI, textEl],
  );

  const onSwipeStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onSwipeEnd = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        go(dx < 0 ? 1 : -1);
      }
    },
    [go],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dismissAnnotationUI();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, dismissAnnotationUI]);

  // Handle clicks on existing highlights
  const onTextClick = useCallback(
    (e: React.MouseEvent) => {
      const mark = (e.target as HTMLElement).closest("mark[data-annotation-id]");
      if (!mark) return;

      const annotationId = mark.getAttribute("data-annotation-id");
      const ann = annotations.find((a) => a.id === annotationId);
      if (!ann) return;

      const rect = mark.getBoundingClientRect();

      // If it has a comment, show the comment popover
      if (ann.comment) {
        setCommentPopover({
          rect,
          annotationId: ann.id,
          initialComment: ann.comment,
        });
        setTooltip(null);
      } else {
        // Show tooltip for editing
        setTooltip({ rect, existingAnnotation: ann });
      }
    },
    [annotations],
  );

  // Annotation actions — use snapshotted offsets from tooltip, not live selection
  const handleColorPick = useCallback(
    async (color: "red" | "yellow" | "green" | "blue") => {
      if (tooltip?.existingAnnotation) {
        await update(tooltip.existingAnnotation.id, { color });
      } else if (tooltip?.startOffset != null && tooltip?.endOffset != null) {
        await create({
          spreadIdx: current,
          startOffset: tooltip.startOffset,
          endOffset: tooltip.endOffset,
          color,
        });
      }
      setTooltip(null);
      window.getSelection()?.removeAllRanges();
    },
    [tooltip, current, create, update],
  );

  const handleOpenComment = useCallback(() => {
    const rect = tooltip?.rect;
    if (!rect) return;

    setCommentPopover({
      rect,
      ...(tooltip?.startOffset != null && { startOffset: tooltip.startOffset }),
      ...(tooltip?.endOffset != null && { endOffset: tooltip.endOffset }),
      annotationId: tooltip?.existingAnnotation?.id,
      initialComment: tooltip?.existingAnnotation?.comment || "",
    });
    setTooltip(null);
  }, [tooltip]);

  const handleSaveComment = useCallback(
    async (comment: string) => {
      if (commentPopover?.annotationId) {
        await update(commentPopover.annotationId, { comment });
      } else if (commentPopover?.startOffset != null && commentPopover?.endOffset != null) {
        await create({
          spreadIdx: current,
          startOffset: commentPopover.startOffset,
          endOffset: commentPopover.endOffset,
          color: "blue",
          comment,
        });
      }
      setCommentPopover(null);
      setTooltip(null);
      window.getSelection()?.removeAllRanges();
    },
    [commentPopover, current, create, update],
  );

  const handleDelete = useCallback(async () => {
    if (tooltip?.existingAnnotation) {
      await remove(tooltip.existingAnnotation.id);
    }
    setTooltip(null);
    window.getSelection()?.removeAllRanges();
  }, [tooltip, remove]);

  const handleDeleteFromComment = useCallback(async () => {
    if (commentPopover?.annotationId) {
      await remove(commentPopover.annotationId);
    }
    setCommentPopover(null);
    setTooltip(null);
  }, [commentPopover, remove]);

  const spread = spreads[current];
  const canPrev = current > 0;
  const canNext = current < spreads.length - 1;

  // Apply highlights to current spread text
  const highlightedTextHtml = spread ? getHighlightedHtml(spread.textHtml, current) : "";

  return (
    <>
      <div ref={contentRef} style={{ display: "none" }}>
        {children}
      </div>

      {spreads.length > 0 && spread && (
        <div className="reader-root">
          {/* Top bar — 3-column grid: back | title | nav (or annotation buttons on mobile) */}
          <div className="reader-bar" ref={barRef}>
            <Link href={backHref} className="reader-back">
              <ArrowLeft className="size-4" />
              <span className="reader-back-text">{backLabel}</span>
            </Link>

            <span className="reader-title">{title}</span>

            <div className="reader-nav">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={!canPrev}
                className="reader-bar-btn"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="reader-indicator">
                {current + 1} / {spreads.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={!canNext}
                className="reader-bar-btn"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Mobile annotation buttons — shown via CSS when data-has-selection="true" */}
            <div className="reader-annotate">
              {(
                [
                  { name: "yellow" as const, bg: "rgba(234, 179, 8, 0.85)" },
                  { name: "red" as const, bg: "rgba(239, 68, 68, 0.85)" },
                  { name: "green" as const, bg: "rgba(34, 197, 94, 0.85)" },
                ] as const
              ).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onPointerDown={snapshotSelection}
                  onClick={() => onMobileColorPick(c.name)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: "2px solid transparent",
                    background: c.bg,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  aria-label={`Highlight ${c.name}`}
                />
              ))}
              <button
                type="button"
                onPointerDown={snapshotSelection}
                onClick={onMobileComment}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted-foreground)",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                  WebkitTapHighlightColor: "transparent",
                }}
                aria-label="Add comment"
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>

          {/* Content area */}
          <div
            className={`reader-spread ${spread.imageHtml ? "" : "text-only"}`}
          >
            {spread.imageHtml && (
              <div
                className="reader-image"
                dangerouslySetInnerHTML={{ __html: spread.imageHtml }}
                onTouchStart={onSwipeStart}
                onTouchEnd={onSwipeEnd}
              />
            )}
            <div
              ref={setTextEl}
              className={`reader-text ${spread.imageHtml ? "" : "full"}`}
              dangerouslySetInnerHTML={{ __html: highlightedTextHtml }}
              onClick={onTextClick}
              onContextMenu={onContextMenu}
              onTouchStart={onSwipeStart}
              onTouchEnd={onSwipeEnd}
            />
          </div>

          {/* Annotation tooltip */}
          {tooltip && (
            <AnnotationTooltip
              rect={tooltip.rect}
              existingColor={tooltip.existingAnnotation?.color}
              existingAnnotationId={tooltip.existingAnnotation?.id}
              onColorPick={handleColorPick}
              onComment={handleOpenComment}
              onDelete={tooltip.existingAnnotation ? handleDelete : undefined}
              onClose={() => setTooltip(null)}
            />
          )}

          {/* Comment popover */}
          {commentPopover && (
            <CommentPopover
              rect={commentPopover.rect}
              initialComment={commentPopover.initialComment}
              onSave={handleSaveComment}
              onDelete={commentPopover.annotationId ? handleDeleteFromComment : undefined}
              onClose={() => setCommentPopover(null)}
            />
          )}

          {/* Desktop hover zones */}
          {canPrev && (
            <div className="reader-hover-zone reader-hover-left" onClick={() => go(-1)}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 rounded-full bg-background/70 opacity-0 shadow-md backdrop-blur transition-opacity"
                aria-label="Previous spread"
                tabIndex={-1}
              >
                <ChevronLeft className="size-5" />
              </Button>
            </div>
          )}
          {canNext && (
            <div className="reader-hover-zone reader-hover-right" onClick={() => go(1)}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 rounded-full bg-background/70 opacity-0 shadow-md backdrop-blur transition-opacity"
                aria-label="Next spread"
                tabIndex={-1}
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          )}

        </div>
      )}

      <style jsx global>{`
        .reader-root {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: var(--background);
          color: var(--muted-foreground);
          font-family: Georgia, "Times New Roman", serif;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
          display: flex;
          flex-direction: column;
        }

        /* ── Top bar: 3-column grid ── */
        .reader-bar {
          flex-shrink: 0;
          height: 2.5rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 0.75rem;
          z-index: 60;
          font-family: system-ui, -apple-system, sans-serif;
          -webkit-tap-highlight-color: transparent;
        }

        /* Left: back link */
        .reader-back {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--muted-foreground);
          text-decoration: none;
          font-size: 0.8rem;
          justify-self: start;
        }

        .reader-back:hover {
          color: var(--muted-foreground);
        }

        .reader-back-text {
          display: none;
        }

        /* Center: title (desktop only) */
        .reader-title {
          font-size: 0.8rem;
          color: var(--muted-foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          padding: 0 0.75rem;
          display: none;
        }

        /* Right: nav buttons */
        .reader-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-self: end;
        }

        .reader-bar-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--border);
          border-radius: 9999px;
          color: var(--muted-foreground);
          width: 1.75rem;
          height: 1.75rem;
          cursor: pointer;
          transition: background 150ms, color 150ms;
        }

        .reader-bar-btn:hover {
          background: var(--accent);
          color: var(--accent-foreground);
        }

        .reader-bar-btn:disabled {
          opacity: 0.25;
          cursor: default;
          pointer-events: none;
        }

        .reader-indicator {
          color: var(--muted-foreground);
          font-size: 0.75rem;
          min-width: 2.5rem;
          text-align: center;
        }

        /* Desktop: show back label + title */
        @media (min-width: 640px) {
          .reader-back-text {
            display: inline;
          }
          .reader-title {
            display: block;
          }
        }

        /* ── Spread area ── */
        .reader-spread {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
          min-height: 0;
          padding: 0 0.75rem 0.75rem;
          gap: 0.75rem;
        }

        .reader-spread.text-only {
          grid-template-columns: 1fr;
          justify-items: center;
        }

        .reader-image {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          overflow: hidden;
          border-radius: 0.75rem;
        }

        .reader-image img {
          max-height: 100%;
          max-width: 100%;
          height: auto !important;
          width: auto !important;
          object-fit: contain;
          border-radius: 0.75rem;
          float: none !important;
          margin: 0 !important;
        }

        .reader-text {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0.5rem 1.25rem;
          font-size: 18px;
          line-height: 1.7;
          min-height: 0;
          color: var(--muted-foreground);
        }

        .reader-text.full {
          max-width: 40rem;
        }

        .reader-text p {
          margin-bottom: 0.85em;
        }

        .reader-text img {
          display: none;
        }

        /* ── Annotation highlights ── */
        .reader-text mark {
          color: inherit;
        }
        .reader-text mark[data-color="red"] {
          background: rgba(239, 68, 68, 0.3);
          border-radius: 2px;
          cursor: pointer;
        }
        .reader-text mark[data-color="yellow"] {
          background: rgba(234, 179, 8, 0.3);
          border-radius: 2px;
          cursor: pointer;
        }
        .reader-text mark[data-color="green"] {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 2px;
          cursor: pointer;
        }
        .reader-text mark[data-color="blue"] {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
          cursor: pointer;
        }
        .reader-text mark[data-has-comment="true"] {
          border-bottom: 2px dotted currentColor;
        }

        /* ── Desktop hover zones ── */
        .reader-hover-zone {
          display: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .reader-hover-zone {
            display: flex;
            align-items: center;
            position: fixed;
            top: 2.5rem;
            bottom: 0;
            z-index: 55;
            cursor: pointer;
          }

          .reader-hover-left {
            left: 0;
            width: 25%;
            justify-content: center;
          }

          .reader-hover-right {
            right: 0;
            width: 25%;
            justify-content: center;
          }

          .reader-hover-zone:hover button {
            opacity: 1 !important;
          }
        }

        /* ── Mobile annotation buttons in top bar ── */
        .reader-annotate {
          display: none;
          align-items: center;
          gap: 8px;
          justify-self: end;
        }

        /* On touch devices: hide nav, show annotate when text is selected */
        @media not all and (hover: hover) and (pointer: fine) {
          .reader-bar[data-has-selection="true"] .reader-nav {
            display: none;
          }
          .reader-bar[data-has-selection="true"] .reader-annotate {
            display: flex;
          }
        }

        /* ── Portrait / narrow screens ── */
        @media (max-aspect-ratio: 1/1) {
          .reader-spread {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 0 1.25rem;
            gap: 0.5rem;
          }
          .reader-image {
            width: 100%;
            aspect-ratio: 4 / 5;
            max-height: 45vh;
            border-radius: 0.75rem;
          }
          .reader-text {
            font-size: 16px;
            padding: 0.25rem 0;
          }
        }
      `}</style>
    </>
  );
}
