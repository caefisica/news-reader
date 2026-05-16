import type { RawItem, NormalizedArticle } from "./types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max = 300): string {
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
}

export function identityParser(item: RawItem): NormalizedArticle {
  const raw = item.description ?? item.summary ?? item.content ?? "";
  const description = truncate(stripHtml(raw));

  const guid = item.guid ?? item.id ?? item.link ?? "";
  const published = item.pubDate ?? item.published ?? item.updated ?? null;

  return {
    guid,
    title: stripHtml(item.title ?? "").trim(),
    link: item.link ?? "",
    description: description || null,
    author: item.author ?? item["dc:creator"] ?? null,
    published_at: published ? Math.floor(new Date(published).getTime() / 1000) : null,
  };
}
