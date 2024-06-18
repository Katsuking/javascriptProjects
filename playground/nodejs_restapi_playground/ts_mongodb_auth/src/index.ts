import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './router';
import errorHandler from './middelwares/errorHandler.middlewares';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI!);
mongoose.connection.on('error', (error: Error) => console.log('error'));

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(errorHandler); // errorは最後に記載

server.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});

app.use('/', router());
