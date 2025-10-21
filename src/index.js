import { createServer } from './app.js';

const PORT = process.env.PORT || 3000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`[boot] node-gitflow-sample rodando na porta ${PORT}`);
});
