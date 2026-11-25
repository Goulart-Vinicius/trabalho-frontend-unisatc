import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    {
      name: "openboard-api",
      configureServer(server) {
        server.middlewares.use(
          "/api/vagas",
          async (
            req: http.IncomingMessage,
            res: http.ServerResponse,
            next: any,
          ) => {
            if (req.method === "GET") {
              next();
              return;
            }

            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Método não permitido" }));
              return;
            }

            let body = "";
            for await (const chunk of req) {
              body += chunk as string;
            }

            let newJob: Record<string, unknown>;
            try {
              newJob = JSON.parse(body);
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "JSON inválido" }));
              return;
            }

            const filePath = path.resolve(
              process.cwd(),
              "public/api/vagas.json",
            );

            try {
              const current = JSON.parse(
                fs.readFileSync(filePath, "utf-8"),
              ) as Record<string, unknown>[];

              const updated = [...current, newJob];
              fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, job: newJob }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Não foi possível salvar a vaga",
                  detail: err instanceof Error ? err.message : String(err),
                }),
              );
            }
          },
        );
      },
    },
  ],
});
