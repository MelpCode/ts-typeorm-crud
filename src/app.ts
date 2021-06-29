import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createConnection } from "typeorm";

import postRoutes from './routes/post.routes';

//Initialization
const app = express();
createConnection();

//Settings
app.set('port',process.env.PORT || 4000);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use(postRoutes);

export default app;