process.env.PORT = process.env.PORT || "3000";
process.env.HOST = process.env.HOST || "0.0.0.0";

console.log(
  `[Runtime] Iniciando aplicación en el puerto ${process.env.PORT}...`
);

/**
 * Manejo de estabilidad: Capturar errores no controlados para evitar caídas abruptas
 */
process.on("uncaughtException", (err) => {
  console.error("[Runtime] Critical Error (Uncaught Exception):", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "[Runtime] Critical Error (Unhandled Rejection) at:",
    promise,
    "reason:",
    reason
  );
});

// Importar el entry point del servidor de forma dinámica
import("../server/entry.mjs")
  .then(() => {
    console.log("[Runtime] Servidor cargado correctamente.");
  })
  .catch((err) => {
    console.error("[Runtime] Error cargando el servidor:", err);
    process.exit(1);
  });
