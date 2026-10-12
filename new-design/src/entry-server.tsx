import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";

/**
 * Build-time renderer used by scripts/prerender.mjs. Waits for lazy routes to resolve
 * (onAllReady) so each page's full HTML is written into its static file.
 */
export const render = (url: string) =>
  new Promise<string>((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString();
        done();
      },
    });
    sink.on("finish", () => resolve(html));
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: (error) => reject(error),
      },
    );
  });
