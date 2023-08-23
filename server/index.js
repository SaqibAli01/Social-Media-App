
//_________App.js_________
import express from "express";
import cors from 'cors';
import path from "path";
import database from "./config/database.js"
import user from './routes/userRoutes.js';
import post from './routes/postRoutes.js';
import comments from './routes/commentRoutes.js';
import likes from './routes/likeRoutes.js';
import request from './routes/requestRouter.js';
import group from './routes/groupRoutes.js';


// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

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
app.use(request)
app.use(group)


//multer //image frontend
app.use("/uploads", express.static("uploads"));
//frontend connect 

app.use(express.static(path.join(path.resolve(), "static")));

const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Server is working on http//localhost:${PORT}`)
});


//______end app.js ____

//frontend connect







// if (process.env.NODE_ENV === 'production') {
//     // Serve the frontend build files
//     app.use(express.static(clientBuildDir2));

//     // Serve the frontend's index.html for all other routes
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(clientBuildDir2));
//     });
// }






//         const __filename = fileURLToPath(import.meta.url);
//         const currentDir = dirname(__filename);
//         const parentDir = dirname(currentDir);
//         const clientBuildDir = join(parentDir, 'client', 'build', 'index.html');
//         const clientBuildDir2 = join(parentDir, 'client', 'public', 'index.html');
// app.use(express.static(clientBuildDir));

// app.get('*', (req, res) => {
//     res.sendFile(clientBuildDir2);
// });




// if (process.env.NODE_ENV === "production") {
//     app.get("/", (req, res) => {
//       app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//       res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
//   }


