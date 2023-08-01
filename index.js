
import database from "./config/database.js"
//_________App.js_________
import express from "express";
import cors from 'cors';
import path from "path";
import user from './routes/userRoutes.js';
import post from './routes/postRoutes.js';
import comments from './routes/commentRoutes.js';
import likes from './routes/likeRoutes.js';
//______App.js end_____________



//call to config file 
import { config } from 'dotenv';
config();

//call to database
database()

//________App.js_____________
const app = express()
app.use(cors());
app.use(express.json());

// Routes
app.use(user);
app.use(post);
app.use(comments);
app.use(likes);

//multer //image frontend
app.use("/uploads", express.static("uploads"));
//frontend connect 
app.use(express.static(path.join(path.resolve(), "static")));
//______end app.js ____

//frontend connect
if (process.env.NODE_ENV === 'production') {
    // Serve the frontend build files
    app.use(express.static(path.join(process.cwd(), 'frontend', 'build')));

    // Serve the frontend's index.html for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'frontend', 'build', 'index.html'));
    });
}
// if (process.env.NODE_ENV === "production") {
//     app.get("/", (req, res) => {
//       app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//       res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
//   }


const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Server is working on http//localhost:${PORT}`)
});
