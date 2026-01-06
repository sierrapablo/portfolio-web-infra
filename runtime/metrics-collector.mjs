let totalRequests = 0;

export function incrementRequests() {
  totalRequests++;
}

/**
 * Recolector básico de métricas en formato Prometheus
 */
export function generateMetrics() {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();
  const cpuUsage = process.cpuUsage();

  let metrics = "";

  // Métricas de Aplicación
  metrics += "# HELP http_requests_total Total number of HTTP requests\n";
  metrics += "# TYPE http_requests_total counter\n";
  metrics += `http_requests_total ${totalRequests}\n`;

  // Métricas de Memoria
  metrics += "# HELP node_memory_rss_bytes Resident set size in bytes\n";
  metrics += "# TYPE node_memory_rss_bytes gauge\n";
  metrics += `node_memory_rss_bytes ${memoryUsage.rss}\n`;

  metrics += "# HELP node_memory_heap_total_bytes Total heap size in bytes\n";
  metrics += "# TYPE node_memory_heap_total_bytes gauge\n";
  metrics += `node_memory_heap_total_bytes ${memoryUsage.heapTotal}\n`;

  metrics += "# HELP node_memory_heap_used_bytes Used heap size in bytes\n";
  metrics += "# TYPE node_memory_heap_used_bytes gauge\n";
  metrics += `node_memory_heap_used_bytes ${memoryUsage.heapUsed}\n`;

  // Métricas de CPU
  metrics +=
    "# HELP node_cpu_usage_user_microseconds CPU user time in microseconds\n";
  metrics += "# TYPE node_cpu_usage_user_microseconds counter\n";
  metrics += `node_cpu_usage_user_microseconds ${cpuUsage.user}\n`;

  metrics +=
    "# HELP node_cpu_usage_system_microseconds CPU system time in microseconds\n";
  metrics += "# TYPE node_cpu_usage_system_microseconds counter\n";
  metrics += `node_cpu_usage_system_microseconds ${cpuUsage.system}\n`;

  // Métricas de Uptime
  metrics += "# HELP node_uptime_seconds Process uptime in seconds\n";
  metrics += "# TYPE node_uptime_seconds counter\n";
  metrics += `node_uptime_seconds ${uptime.toFixed(0)}\n`;

  return metrics;
}
