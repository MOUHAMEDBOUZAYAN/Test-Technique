import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management'
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'Mouhamed12@#$%^&*()',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
};

