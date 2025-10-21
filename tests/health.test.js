import request from 'supertest';

import { createServer } from '../src/app.js';

describe('GET /health', () => {
  const app = createServer();

  it('retorna ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
