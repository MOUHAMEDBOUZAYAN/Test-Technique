import mongoose from 'mongoose';
import { config } from './settings.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    const connection = await mongoose.connect(config.database.uri);
    isConnected = true;
    console.log(`Database connected: ${connection.connection.host}`);
    
    mongoose.connection.on('error', (error) => {
      console.error('Database connection error:', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Database disconnected');
      isConnected = false;
    });

  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Database disconnected');
  } catch (error) {
    console.error('Error disconnecting:', error.message);
  }
};

