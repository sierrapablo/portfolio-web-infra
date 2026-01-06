import http from "node:http";
import { generateMetrics, incrementRequests } from "./metrics-collector.mjs";

/**
 * Esta función intercepta http.createServer para inyectar el endpoint /metrics
 * en el servidor que se cree posteriormente (el de server/entry.mjs)
 */
export function setupMetricsInterceptor() {
  const originalCreateServer = http.createServer;

  http.createServer = function (options, requestListener) {
    let listener = requestListener;
    let opts = options;

    // Manejar sobrecarga de createServer(requestListener)
    if (typeof options === "function") {
      listener = options;
      opts = {};
    }

    const wrappedListener = async (req, res) => {
      if (req.url === "/metrics") {
        res.writeHead(200, {
          "Content-Type": "text/plain; version=0.0.4",
          "Cache-Control": "no-cache",
        });
        res.end(generateMetrics());
        return;
      }

      // Si hay un listener original, ejecutarlo
      if (listener) {
        incrementRequests();
        return listener(req, res);
      }
    };

    console.log("[Runtime] Endpoint /metrics inyectado en el servidor.");
    return originalCreateServer.call(http, opts, wrappedListener);
  };
}

setupMetricsInterceptor();
