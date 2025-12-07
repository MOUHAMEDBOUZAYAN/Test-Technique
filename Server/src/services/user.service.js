import User from '../models/User.js';

export const getAllUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUser = async (userId, updateData, currentUser) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (currentUser.role !== 'admin' && currentUser._id.toString() !== userId) {
    throw new Error('You can only update your own profile');
  }

  if (updateData.email && updateData.email !== user.email) {
    const emailExists = await User.findOne({ email: updateData.email });
    if (emailExists) {
      throw new Error('Email already exists');
    }
  }

  Object.keys(updateData).forEach(key => {
    if (updateData[key] !== undefined) {
      user[key] = updateData[key];
    }
  });

  await user.save();
  return user;
};

export const deleteUser = async (userId, currentUser) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (currentUser.role !== 'admin' && currentUser._id.toString() !== userId) {
    throw new Error('You can only delete your own account');
  }

  await User.findByIdAndDelete(userId);
  return { message: 'User deleted successfully' };
};

