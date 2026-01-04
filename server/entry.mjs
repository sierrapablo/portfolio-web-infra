import http from 'node:http';

const PORT = process.env.PORT || 4321;
const HOST = process.env.HOST || '0.0.0.0';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Esperando deployment</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      font-family: system-ui, sans-serif;
      color: #fff;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    p { color: #a0aec0; }
    .pulse {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #667eea;
      border-radius: 50%;
      margin-right: 8px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Infraestructura lista</h1>
    <p><span class="pulse"></span>Esperando deployment de la aplicación...</p>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(html);
});

server.listen(PORT, HOST, () => {
    console.log(`[Placeholder] Servidor escuchando en http://${HOST}:${PORT}`);
    console.log('[Placeholder] Esperando deployment de Astro SSR...');
});