import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({
    received: req.body ?? null,
    env: process.env.ENV_NAME || 'local'
  });
});

export default router;
