// Importar dependencias
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para rutas absolutas (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON (por si después agregamos API)
app.use(express.json());

// Servir carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint básico para probar que funciona
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando 🚀' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
});
