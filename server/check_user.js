const User = require('./models/User');
const connectDB = require('./db');
require('dotenv').config();

connectDB(process.env.MONGO_URI).then(async () => {
  try {
    const user = await User.findOne({email: 'admin@example.com'});
    console.log('User found:', !!user);
    if (user) {
      console.log('User data:', {
        email: user.email,
        role: user.role,
        isActive: user.isActive
      });
      const match = await user.matchPassword('password123');
      console.log('Password match:', match);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
});
