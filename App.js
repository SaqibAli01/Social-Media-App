import express from "express";
import cors from 'cors';
import path from "path";
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(likeRoutes);

// Multer: Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Serve frontend static assets
app.use(express.static(path.join(path.resolve(), "static")));

export default app;
