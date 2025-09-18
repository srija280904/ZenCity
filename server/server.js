// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import { startDataSimulation } from './utils/dataSimulator.js';

// // Import Routes
// import authRoutes from './routes/authRoutes.js';
// import dataRoutes from './routes/dataRoutes.js';
// import alertRoutes from './routes/alertRoutes.js';

// // Configuration
// dotenv.config();
// connectDB();
// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/data', dataRoutes);
// app.use('/api/alerts', alertRoutes);
// import User from './models/User.js';
// // const createAdmin = async () => {
// //     const userExists = await User.findOne({ username: 'Admin' });
// //     if(!userExists) {
// //         await User.create({ username: 'Admin', password: '123456', role: 'Admin'});
// //         console.log('Admin user created!');
// //     }
// // }
// // createAdmin();
// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   // Start the mock data simulation
//   startDataSimulation();
// });

//updated
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { startDataSimulation } from './utils/dataSimulator.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

// Import User Model for the creation script
import User from './models/User.js';

// Configuration
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/alerts', alertRoutes);


// This function safely creates the default admin user ONLY if it doesn't already exist.
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'Admin' });
    if (!adminExists) {
      await User.create({
        username: 'Admin',
        password: '123456',
        role: 'Admin'
      });
      console.log('Default Admin user created!');
    }
  } catch (error) {
    // This will prevent the server from crashing if there's a database error.
    console.error('Error creating default admin user:', error.message);
  }
};


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Create the default user if it doesn't exist
  createDefaultAdmin();

  // Start the mock data simulation
  startDataSimulation();
});