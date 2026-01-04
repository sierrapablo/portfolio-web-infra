import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {
    fileURLToPath
} from 'node:url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4321;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript',
};

// Leer versión al inicio
const versionPath = path.join(__dirname, '../VERSION');
let version = '0.0.0';
try {
    version = fs.readFileSync(versionPath, 'utf-8').trim();
} catch (e) {
    console.error('No se pudo leer el archivo VERSION', e);
}

const server = http.createServer((req, res) => {
    // Determinar el archivo a servir
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Manejo especial para inyectar la versión en el footer.js
    if (filePath === '/footer.js') {
        const footerPath = path.join(__dirname, 'footer.js');
        if (fs.existsSync(footerPath)) {
            let content = fs.readFileSync(footerPath, 'utf-8');
            content = content.replace('{{VERSION}}', version);
            res.writeHead(200, {
                'Content-Type': MIME_TYPES['.js']
            });
            res.end(content);
            return;
        }
    }

    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(fullPath);

    // Verificar si el archivo existe
    if (!fs.existsSync(fullPath)) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('404 Not Found');
        return;
    }

    // Servir el archivo con el Content-Type correcto
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(fullPath, 'utf-8');

    res.writeHead(200, {
        'Content-Type': contentType
    });
    res.end(content);
});

server.listen(PORT, HOST, () => {
    console.log(`[Placeholder] Servidor escuchando en http://${HOST}:${PORT}`);
    console.log('[Placeholder] Esperando deployment de Astro SSR...');
});