// index.ts (après tes modifications)
import { serve } from "bun";

serve({
  fetch(request) {
    // 1. Log de la requête
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${request.url}`
    );

    // 2. Réponse customisée
    const body = `✅ Serveur Bun en dev – hotfix intégré avec succès !\nVous avez demandé : ${request.url}`;
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
});
