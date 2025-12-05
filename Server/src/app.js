import express from 'express';
import { config } from './config/settings.js';

const app = express();

// Middleware أساسي
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route تجريبي
app.get('/', (req, res) => {
  res.json({ 
    message: 'API جاهزة للعمل',
    status: 'running'
  });
});

// بدء الخادم
const startServer = () => {
  app.listen(config.port, () => {
    console.log(`الخادم يعمل على المنفذ ${config.port}`);
  });
};

startServer();

export default app;

