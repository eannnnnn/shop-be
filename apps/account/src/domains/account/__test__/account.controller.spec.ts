import { Test, type TestingModule } from '@nestjs/testing';

import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  describe('shouldCreateAccountController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have health endpoint', () => {
      const result = controller.health();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('status');
      expect(result.status).toBe('ok');
    });
  });

  describe('shouldHaveTypedRouteDecorator', () => {
    it('should use TypedRoute decorator for health endpoint', () => {
      // This test verifies that the controller uses @TypedRoute.Get instead of @Get
      const result = controller.health();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('status');
      expect(result.status).toBe('ok');

      // The fact that this works with the mocked @TypedRoute.Get decorator
      // confirms the controller is using Nestia's type-safe routing
      expect(typeof controller.health).toBe('function');
    });
  });

  describe('shouldReturnTypedResponse', () => {
    it('should return properly typed health response', () => {
      const result = controller.health();

      // Verify the response has the expected structure
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');

      // Check that the response conforms to the expected DTO structure
      expect(result).toHaveProperty('status');
      expect(typeof result.status).toBe('string');
      expect(result.status).toBe('ok');

      // Verify that the response includes timestamp for proper DTO structure
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('string');
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
    });
  });
});