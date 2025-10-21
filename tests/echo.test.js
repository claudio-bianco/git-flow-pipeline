import request from 'supertest';

import { createServer } from '../src/app.js';

describe('POST /echo', () => {
  const app = createServer(); // não chame app.listen()

  it('retorna payload e ENV_NAME', async () => {
    process.env.ENV_NAME = 'test';

    const res = await request(app).post('/echo').send({ msg: 'hello' });

    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual({ msg: 'hello' });
    expect(res.body.env).toBe('test');
  });
});
