import app from "./App.js";
import database from "./config/database.js";
// import app from './App.js'; // Assuming 'App.js' exports the 'app' instance

// Call to config file
import { config } from 'dotenv';
config();

// Call to database
database();

const PORT = process.env.PORT || 3000; // Provide a default port (e.g., 3000) if the environment variable is not set

app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Server is working on http://localhost:${PORT}`);
});
