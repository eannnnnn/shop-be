import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';

import { type HelloResponse, TypedController } from './typed.controller.js';

describe('TypedController', () => {
  let app: NestFastifyApplication;
  let controller: TypedController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypedController],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    controller = module.get<TypedController>(TypedController);
  });

  afterAll(async () => {
    await app?.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have @TypedRoute decorated methods', () => {
    // TypedRoute가 적용된 메서드가 존재하는지 확인
    expect(controller.getHello).toBeDefined();
    expect(typeof controller.getHello).toBe('function');
  });

  it('should respond with typed data structure', async () => {
    const result = await controller.getHello();
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });

  // @TypedRoute HTTP API Tests (vitest mock 버전)
  describe('@TypedRoute HTTP API Tests (mocked)', () => {
    it('should respond to HTTP GET request with correct content-type', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/typed/hello',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
    });

    it('should return response matching HelloResponse interface', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/typed/hello',
      });

      const body = JSON.parse(response.payload) as HelloResponse;

      // 타입 구조 검증
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('timestamp');
      expect(typeof body.message).toBe('string');
      expect(typeof body.timestamp).toBe('number');
      expect(body.message).toBe('Hello from Nestia + Fastify!');
    });

    it('should validate response structure at runtime', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/typed/hello',
      });

      const body = JSON.parse(response.payload);

      // 런타임에서 타입 구조 검증
      expect(body).toEqual(
        expect.objectContaining({
          message: expect.any(String),
          timestamp: expect.any(Number),
        }),
      );

      // timestamp가 유효한 타임스탬프인지 확인
      expect(body.timestamp).toBeGreaterThan(0);
      expect(new Date(body.timestamp).getTime()).toBe(body.timestamp);
    });

    it('should handle JSON serialization correctly', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/typed/hello',
      });

      // JSON 파싱이 성공해야 함
      expect(() => JSON.parse(response.payload)).not.toThrow();

      const body = JSON.parse(response.payload);

      // 직렬화된 데이터가 올바른 형태인지 확인
      expect(JSON.stringify(body)).toBe(response.payload);
    });

    it('should use mocked @TypedRoute.Get decorator', () => {
      // mock이 제대로 적용되었는지 확인
      // 실제로는 @Get 데코레이터가 사용되고 있어야 함
      const routeMetadata = Reflect.getMetadata('path', controller.getHello);
      expect(routeMetadata).toBe('hello');

      // NestJS의 실제 메타데이터 구조 확인
      const methodMetadata = Reflect.getMetadata('method', controller.getHello);
      // NestJS는 GET을 숫자로 저장하므로 0이 정상
      expect(methodMetadata).toBe(0); // 0 = GET, 1 = POST, etc.

      // controller가 정상적으로 정의되었는지 확인
      expect(controller.getHello).toBeDefined();
      expect(typeof controller.getHello).toBe('function');
    });
  });
});
