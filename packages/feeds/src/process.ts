import type { Source } from "./types";
import { fetchFeed } from "./fetch";
import { parseItem } from "./parsers/index";

export async function processSource(source: Source, db: D1Database): Promise<void> {
  let items;
  try {
    items = await fetchFeed(source.url);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await db
      .prepare("UPDATE sources SET last_error = ?, last_fetched_at = unixepoch() WHERE id = ?")
      .bind(msg, source.id)
      .run();
    console.error(`[${source.name}] fetch failed: ${msg}`);
    return;
  }

  const normalized = items.map((item) => parseItem(item, source.parser));

  const stmt = db.prepare(
    `INSERT OR IGNORE INTO articles (source_id, guid, title, link, description, author, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );

  const inserts = normalized
    .filter((a) => a.guid && a.title && a.link)
    .map((a) =>
      stmt.bind(source.id, a.guid, a.title, a.link, a.description, a.author, a.published_at),
    );

  if (inserts.length > 0) {
    await db.batch(inserts);
  }

  await db
    .prepare("UPDATE sources SET last_fetched_at = unixepoch(), last_error = NULL WHERE id = ?")
    .bind(source.id)
    .run();

  console.log(`[${source.name}] upserted ${inserts.length}/${normalized.length} articles`);
}
