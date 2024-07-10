import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('mongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Define the list of allowed origins
const allowedOrigins = [
  'https://blog-app-nine-lake.vercel.app',
  'http://localhost:5173',
  'https://blog-ikebfojuf-codinghub30s-projects.vercel.app'
];

// Configure the CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
};

// Use the CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// Define your routes
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log("working");
});
