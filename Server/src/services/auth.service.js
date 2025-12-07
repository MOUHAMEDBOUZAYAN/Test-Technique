import User from '../models/User.js';
import { generateToken } from '../utils/jwt.util.js';

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  
  if (existingUser) {
    throw new Error('Email already exists');
  }

  if (userData.password !== userData.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const user = new User({
    nom: userData.nom,
    prenom: userData.prenom,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user'
  });

  await user.save();

  const tokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const token = generateToken(tokenPayload);

  return {
    user: user.toJSON(),
    token
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const tokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const token = generateToken(tokenPayload);

  return {
    user: user.toJSON(),
    token
  };
};

