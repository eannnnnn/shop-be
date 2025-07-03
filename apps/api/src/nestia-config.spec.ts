import { existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Nestia Configuration', () => {
  const configFilePath = join(process.cwd(), 'nestia.config.ts');

  it('should have nestia.config.ts file in the project root', () => {
    expect(existsSync(configFilePath)).toBe(true);
  });

  it('should be able to import nestia.config.ts without errors', async () => {
    if (existsSync(configFilePath)) {
      const config = await import(configFilePath);
      expect(config).toBeDefined();
      expect(config.default).toBeDefined();
    } else {
      // 파일이 없다면 테스트 스킵
      expect(false).toBe(true); // 의도적인 실패
    }
  });
});
