export default async () => {
  const { config } = await import('@shop-be/vitest-config/nest-e2e');
  return config;
};
