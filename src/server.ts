import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import next from 'next';

const dev = process.env.COZE_PROJECT_ENV !== 'PROD';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '5000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      let p = parsedUrl.pathname || '/';
      if (p === '/') p = '/index.html';

      // Try static file from public/
      const fp = join(process.cwd(), 'public', p);
      if (existsSync(fp) && statSync(fp).isFile()) {
        const ext = extname(fp).toLowerCase();
        res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.end(readFileSync(fp));
        return;
      }

      // Fall back to Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });
  server.once('error', err => { console.error(err); process.exit(1); });
  server.listen(port, () => { console.log(`> Server on ${hostname}:${port}`); });
});