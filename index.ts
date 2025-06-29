import { serve } from "bun";
import { join } from "path";
import { existsSync } from "fs";

const PORT = 3000;
const PUBLIC_DIR = join(process.cwd(), "public");

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname === "/" ? "/index.html" : url.pathname;

    const fullPath = join(PUBLIC_DIR, filePath);

    if (existsSync(fullPath)) {
      const file = Bun.file(fullPath);
      const contentType = getContentType(fullPath);
      return new Response(file, { headers: { "Content-Type": contentType } });
    }

    // Handle 404
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${PORT}`);

// Minimal Content-Type resolver
function getContentType(filePath: string): string {
  if (filePath.endsWith(".html")) return "text/html";
  if (filePath.endsWith(".css")) return "text/css";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
    return "image/jpeg";
  if (filePath.endsWith(".js")) return "application/javascript";
  return "text/plain";
}
