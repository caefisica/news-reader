import { processSource } from "@news-reader/feeds";
import type { Source } from "@news-reader/feeds";

export interface Env {
  DB: D1Database;
}

interface QueueMessage {
  sources: Source[];
}

export default {
  async queue(batch: MessageBatch<QueueMessage>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      await Promise.allSettled(message.body.sources.map((s) => processSource(s, env.DB)));
      message.ack();
    }
  },
};
