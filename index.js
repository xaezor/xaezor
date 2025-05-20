const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./models/User'); // Import the User model
const connectDB = require('./db');     // Import the connectDB function

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET; // Ensure you have this in your .env

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
if (mongoURI) {
  connectDB(mongoURI);
} else {
  console.error('MONGO_URI environment variable not found. Please create a .env file in the server directory.');
  process.exit(1);
}

// Multer setup for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + req.userId + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter,
});

// Middleware to extract user ID from token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Auth Header:', authHeader);
  console.log('Token:', token);

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.sendStatus(403);
    }
    console.log('Token verified, user:', user);
    req.userId = user.userId;
    next();
  });
};

// API Endpoints
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already exists' });
    }
    const newUser = new User({ username, email, password, profilePicture: 'default.png' }); // Password will be hashed by pre-save hook
    await newUser.save();
    console.log('User saved successfully:', newUser.username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login attempt failed: User not found -', username);
      return res.status(400).json({ message: 'Invalid username' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Login attempt failed: Invalid password for user -', username);
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    console.log('Login successful for user:', username);
    
    res.json({ 
      token, 
      userId: user._id, 
      username: user.username,
      profilePicture: user.profilePicture 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// New PUT route to update profile (bio and profile picture)
app.put('/api/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  console.log('Received PUT request to /api/profile');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  try {
    const updateData = {};
    
    // Update bio if provided
    if (req.body.bio) {
      updateData.bio = req.body.bio;
    }

    // Update profile picture if a file is uploaded
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    // If no updates are provided, return an error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Existing POST route for profile picture upload (kept for compatibility)
app.post('/api/profile/upload', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filename = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.userId, { profilePicture: filename });
    res.json({ message: 'Profile picture uploaded successfully', filename });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});