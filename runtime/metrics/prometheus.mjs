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
  prefix: "nodejs_",
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

/**
 * Handler genérico para /metrics
 * (framework-agnostic)
 */
export function metricsHandler(req, res) {
  res.writeHead(200, {
    "Content-Type": register.contentType,
    "Cache-Control": "no-cache",
  });
  res.end(register.metrics());
}
