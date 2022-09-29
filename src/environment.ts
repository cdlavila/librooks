export const getEnvironment = (): string => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return '.env.test';
    case 'production':
      return '.env.production'
    default:
      return '.env'
  }
};
