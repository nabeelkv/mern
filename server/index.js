import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true })); //to receive request
app.use(express.urlencoded({ limit: "30mb", extended: true })); //to send request
app.use(cors());

app.use('/posts', postRoutes); //added prefix for all postRoutes for getting posts as json
app.use('/user', userRoutes); //added prefix for all postRoutes for getting posts as json

//Datbase setup (MangoDB Atlas Cluster - Online Cloud Database)
const CONNECTION_URL = '';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));