import {
  httpRequestCounter,
  httpRequestDuration,
} from "../metrics/prometheus.mjs";

export function withHttpMetrics(handler) {
  return async function (req, res) {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const duration = Number(process.hrtime.bigint() - start) / 1e9;

      httpRequestCounter.inc({
        method: req.method,
        path: req.url,
        status: res.statusCode,
      });

      httpRequestDuration.observe(
        {
          method: req.method,
          path: req.url,
          status: res.statusCode,
        },
        duration
      );
    });

    return handler(req, res);
  };
}
