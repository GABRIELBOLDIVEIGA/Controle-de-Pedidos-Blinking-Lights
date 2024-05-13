export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  jwt: {
    secret: `${process.env.JWT_SECRET}`,
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  },
});
