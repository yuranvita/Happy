import express from 'express';
import './database/connection';
import routes from './routes';
import path from 'path';
import 'express-async-errors';
import errorHundler from './errors/hundler';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads' , express.static(path.join(__dirname, '..','uploads')))
app.use(errorHundler);

app.listen(3333);