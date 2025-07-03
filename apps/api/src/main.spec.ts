import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';

import { AppModule } from './app.module.js';

describe('Main Application Bootstrap', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('should use Fastify platform instead of Express', () => {
    const httpAdapter = app.getHttpAdapter();
    expect(httpAdapter.constructor.name).toBe('FastifyAdapter');
  });

  it('should have Fastify instance available', () => {
    const fastifyInstance = app.getHttpAdapter().getInstance();
    expect(fastifyInstance).toBeDefined();
    expect(typeof fastifyInstance.listen).toBe('function');
    expect(typeof fastifyInstance.register).toBe('function');
  });
});
