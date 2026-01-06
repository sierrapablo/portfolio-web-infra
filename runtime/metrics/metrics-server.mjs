import http from "node:http";
import { metricsHandler } from "./prometheus.mjs";

export function startMetricsServer() {
  const port = process.env.METRICS_PORT || 9100;
  const host = process.env.HOST || "0.0.0.0";

  const server = http.createServer((req, res) => {
    if (req.url === "/metrics") {
      metricsHandler(req, res);
      return;
    }

    if (req.url === "/healthz") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  });

  server.listen(port, host, () => {
    console.log(
      `[Metrics] Endpoint /metrics expuesto en http://${host}:${port}`
    );
  });
}
