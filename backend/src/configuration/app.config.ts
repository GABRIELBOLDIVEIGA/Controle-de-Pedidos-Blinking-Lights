export default () => ({
  appSecret: process.env.JWT_SECRET,
  appExpiresIn: process.env.JWT_EXPIRES_IN,

  appDatabaseHost: process.env.DATABASE_HOST,
  appDatabaseSchema: process.env.DATABASE_SCHEMA,
  appDatabasePort: process.env.DATABASE_PORT,
  appDatabaseUser: process.env.DATABASE_USER,
  appDatabasePassword: process.env.DATABASE_PASSWORD,
});
