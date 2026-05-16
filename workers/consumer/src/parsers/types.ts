export interface RawItem {
  title?: string;
  link?: string;
  guid?: string;
  id?: string;
  pubDate?: string;
  published?: string;
  updated?: string;
  author?: string;
  "dc:creator"?: string;
  description?: string;
  summary?: string;
  content?: string;
  [key: string]: unknown;
}

export interface NormalizedArticle {
  guid: string;
  title: string;
  link: string;
  description: string | null;
  author: string | null;
  published_at: number | null;
}

export type Parser = (item: RawItem) => NormalizedArticle;
