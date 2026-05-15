import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
});

// Avoid compiling the model multiple times in serverless environments
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
