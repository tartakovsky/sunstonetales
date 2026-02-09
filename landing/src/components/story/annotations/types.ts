export interface Annotation {
  id: string;
  storySlug: string;
  locale: string;
  spreadIdx: number;
  startOffset: number;
  endOffset: number;
  color: "red" | "yellow" | "green";
  comment: string | null;
  createdAt: string;
}
