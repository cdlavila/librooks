export default () => ({
  database: {
    development: {
      host: process.env.DATABASE_HOST_DEV,
      port: process.env.DATABASE_PORT_DEV,
      rootPassword: process.env.DATABASE_ROOT_PASSWORD_DEV,
      name: process.env.DATABASE_NAME_DEV,
      user: process.env.DATABASE_USER_DEV,
      password: process.env.DATABASE_PASSWORD_DEV,
    },
    test: {
      host: process.env.DATABASE_HOST_TEST,
      port: process.env.DATABASE_PORT_TEST,
      rootPassword: process.env.DATABASE_ROOT_PASSWORD_TEST,
      name: process.env.DATABASE_NAME_TEST,
      user: process.env.DATABASE_USER_TEST,
      password: process.env.DATABASE_PASSWORD_TEST,
    },
    production: {
      host: process.env.DATABASE_HOST_PROD,
      port: process.env.DATABASE_PORT_PROD,
      rootPassword: process.env.DATABASE_ROOT_PASSWORD_PROD,
      name: process.env.DATABASE_NAME_PROD,
      user: process.env.DATABASE_USER_PROD,
      password: process.env.DATABASE_PASSWORD_PROD,
    },
  },
});
