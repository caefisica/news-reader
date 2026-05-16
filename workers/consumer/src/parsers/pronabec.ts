import type { RawItem, NormalizedArticle } from "./types";
import { identityParser } from "./identity";

// gob.pe RSS feeds set the <link> to a search results page rather than
// the article itself. The actual article URL is in <guid isPermaLink="true">.
export function pronabecParser(item: RawItem): NormalizedArticle {
  const base = identityParser(item);

  const directLink =
    typeof item.guid === "string" && item.guid.startsWith("http") ? item.guid : base.link;

  return { ...base, link: directLink };
}
