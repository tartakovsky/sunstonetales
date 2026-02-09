"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, X } from "lucide-react";

const COLORS = [
  { name: "yellow" as const, bg: "rgba(234, 179, 8, 0.85)" },
  { name: "red" as const, bg: "rgba(239, 68, 68, 0.85)" },
  { name: "green" as const, bg: "rgba(34, 197, 94, 0.85)" },
];

interface AnnotationTooltipProps {
  rect: DOMRect;
  existingColor?: string | undefined;
  existingAnnotationId?: string | undefined;
  onColorPick: (color: "red" | "yellow" | "green" | "blue") => void;
  onComment: () => void;
  onDelete?: (() => void) | undefined;
  onClose: () => void;
}

export function AnnotationTooltip({
  rect,
  existingColor,
  existingAnnotationId,
  onColorPick,
  onComment,
  onDelete,
  onClose,
}: AnnotationTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const tt = tooltipRef.current;
    if (!tt) return;

    const ttRect = tt.getBoundingClientRect();
    let top = rect.top - ttRect.height - 8;
    let left = rect.left + rect.width / 2 - ttRect.width / 2;

    // Keep within viewport
    if (top < 4) top = rect.bottom + 8;
    if (left < 4) left = 4;
    if (left + ttRect.width > window.innerWidth - 4) left = window.innerWidth - ttRect.width - 4;

    setPos({ top, left });
  }, [rect]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    // Delay to avoid the click that opened us
    const timer = setTimeout(() => document.addEventListener("mousedown", onClick), 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 8,
        background: "rgba(30, 30, 30, 0.95)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {COLORS.map((c) => (
        <button
          key={c.name}
          type="button"
          onClick={() => onColorPick(c.name)}
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: existingColor === c.name ? "2px solid white" : "2px solid transparent",
            background: c.bg,
            cursor: "pointer",
            transition: "transform 100ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label={`Highlight ${c.name}`}
        />
      ))}

      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

      <button
        type="button"
        onClick={onComment}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.8)",
          cursor: "pointer",
          padding: 2,
          display: "flex",
        }}
        aria-label="Add comment"
      >
        <MessageSquare size={18} />
      </button>

      {existingAnnotationId && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: 2,
            display: "flex",
          }}
          aria-label="Delete annotation"
        >
          <X size={18} />
        </button>
      )}
    </div>,
    document.body,
  );
}
