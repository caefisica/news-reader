import type { RawItem, NormalizedArticle } from "../types";

function decodeEntities(text: string): string {
  return text
    .replaceAll(/&amp;/g, "&")
    .replaceAll(/&lt;/g, "<")
    .replaceAll(/&gt;/g, ">")
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/&apos;|&#39;/g, "'")
    .replaceAll(/&nbsp;/g, " ")
    .replaceAll(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

function stripHtml(html: string): string {
  return decodeEntities(html)
    .replaceAll(/<[^>]+>/g, "")
    .replaceAll(/\s+/g, " ")
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
