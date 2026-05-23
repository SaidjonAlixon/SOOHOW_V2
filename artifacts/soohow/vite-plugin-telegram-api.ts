import type { IncomingMessage, ServerResponse } from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const pluginDir = path.dirname(fileURLToPath(import.meta.url));
const telegramHandler = require(path.resolve(pluginDir, "../../api/telegram.js")) as (
  req: { method?: string; body?: unknown; headers?: IncomingMessage["headers"] },
  res: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => { json: (body: unknown) => void; end: () => void };
  },
) => Promise<void>;

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function matchesTelegramPath(url: string, apiPath: string): boolean {
  const pathname = url.split("?")[0] ?? "";
  return pathname === apiPath || pathname === `${apiPath}/`;
}

export function telegramApiDevPlugin(apiPath = "/api/telegram"): Plugin {
  return {
    name: "telegram-api-dev",
    configureServer: {
      order: "pre",
      handler(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url ?? "";
          if (req.method !== "POST" || !matchesTelegramPath(url, apiPath)) {
            next();
            return;
          }

          try {
            const raw = await readBody(req);
            let body: unknown = {};
            if (raw) {
              try {
                body = JSON.parse(raw);
              } catch {
                body = {};
              }
            }

            const nodeRes = res as ServerResponse;
            await telegramHandler(
              { method: req.method, body, headers: req.headers },
              {
                setHeader(name, value) {
                  nodeRes.setHeader(name, value);
                },
                status(code) {
                  nodeRes.statusCode = code;
                  return {
                    json(payload: unknown) {
                      nodeRes.setHeader("Content-Type", "application/json");
                      nodeRes.end(JSON.stringify(payload));
                    },
                    end() {
                      nodeRes.end();
                    },
                  };
                },
              },
            );
          } catch (err) {
            console.error("[telegram-api-dev]", err);
            if (!res.writableEnded) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Internal server error" }));
            }
          }
        });
      },
    },
  };
}
