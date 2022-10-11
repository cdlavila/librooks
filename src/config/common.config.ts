import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
