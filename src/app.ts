import {createServer} from 'http';
import express, {json, urlencoded} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {BODY_LIMIT, CORS_ORIGIN, IS_DEV} from './env';
import {errorsMiddleware} from './middlewares/errors.middleware';

export const app = express();

if (!IS_DEV) app.use(helmet());

app.use(
	cors({
		origin: CORS_ORIGIN,
		methods: ['GET', 'POST'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.use(json({limit: BODY_LIMIT}));
app.use(urlencoded({extended: true}));
app.use(cookieParser());

app.use(errorsMiddleware);

export const server = createServer(app);
