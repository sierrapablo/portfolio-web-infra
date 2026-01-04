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

// Read version from file
const versionPath = path.join(__dirname, '../VERSION');
let version = '0.0.0';
try {
    version = fs.readFileSync(versionPath, 'utf-8').trim();
} catch (e) {
    console.error('No se pudo leer el archivo VERSION', e);
}

const server = http.createServer(async (req, res) => {
    try {
        // Sanitize URL to prevent path traversal
        const unsafePath = req.url === '/' ? '/index.html' : req.url;
        const safePath = path.normalize(unsafePath).replace(/^(\.\.[\/\\])+/, '');
        const fullPath = path.join(__dirname, safePath);

        // Ensure the path is within the intended directory
        if (!fullPath.startsWith(__dirname)) {
            res.writeHead(403, {
                'Content-Type': 'text/plain'
            });
            res.end('Forbidden');
            return;
        }

        // Special handling for footer.js
        if (fullPath === path.join(__dirname, 'footer.js')) {
            let content = await fs.promises.readFile(fullPath, 'utf-8');
            content = content.replace('{{VERSION}}', version);
            res.writeHead(200, {
                'Content-Type': MIME_TYPES['.js']
            });
            res.end(content);
            return;
        }

        // Serve other static files
        const ext = path.extname(fullPath);
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const content = await fs.promises.readFile(fullPath);
        res.writeHead(200, {
            'Content-Type': contentType
        });
        res.end(content);

    } catch (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('404 Not Found');
        } else {
            console.error(`Server error:`, err);
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('Internal Server Error');
        }
    }
});

server.listen(PORT, HOST, () => {
    console.log(`[Placeholder] Servidor escuchando en http://${HOST}:${PORT}`);
    console.log('[Placeholder] Esperando deployment de Astro SSR...');
});