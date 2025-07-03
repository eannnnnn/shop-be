import { type INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  swagger: {
    output: 'swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
  distribute: 'packages/api-sdk',
  primitive: false,
  clone: false,
};

export default config;
