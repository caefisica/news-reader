import type { RawItem, NormalizedArticle } from "./types";
import { identityParser } from "./identity";

// Blogger feeds wrap content in <div> boilerplate and often duplicate
// the post title inside the description. We strip that and fall back
// to the identity parser for everything else.
export function blogspotParser(item: RawItem): NormalizedArticle {
  const base = identityParser(item);

  // Blogger sometimes injects "Posted by X" footers — strip them.
  const cleaned =
    base.description
      ?.replace(/Posted by .+?at \d{1,2}:\d{2} [AP]M\.?/i, "")
      ?.replace(/No comments?:/i, "")
      ?.trim() ?? null;

  return { ...base, description: cleaned || base.description };
}
