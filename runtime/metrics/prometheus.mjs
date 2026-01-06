import {
  collectDefaultMetrics,
  register,
  Counter,
  Histogram,
} from "prom-client";

/**
 * Registrar métricas estándar de Node.js
 */
collectDefaultMetrics({
  prefix: "",
  timeout: 5000,
});

/**
 * Métricas HTTP
 */
export const httpRequestCounter = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path", "status"],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "path", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
});

export async function metricsHandler(_req, res) {
  try {
    const metrics = await register.metrics();
    res.writeHead(200, {
      "Content-Type": register.contentType,
      "Cache-Control": "no-cache",
    });
    res.end(metrics);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error generando métricas");
    console.error("[Metrics] Error:", err);
  }
}
