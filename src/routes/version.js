import { createRequire } from 'node:module';

import { Router } from 'express';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json'); // ⬅️ sem import assertion

const router = Router();

router.get('/', (_req, res) => {
  res.json({ name: pkg.name, version: pkg.version });
});

export default router;
