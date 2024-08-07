import {join} from 'path';
import {config} from 'dotenv';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEV = NODE_ENV !== 'production';

config({
	path: join(__dirname, `../.${IS_DEV ? 'dev' : 'pro'}.env`),
});

export const SERVER_DOCKER_PORT = +(process.env.SERVER_DOCKER_PORT || 4000);
export const SERVER_NETWORK_PORT = +(process.env.SERVER_NETWORK_PORT || 4000);

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const BODY_LIMIT = process.env.BODY_LIMIT || '24mb';

export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';

export const DATABASE_NETWORK_PORT = +(
	process.env.DATABASE_NETWORK_PORT || 27017
);
export const DATABASE_USER = process.env.DATABASE_USER || 'admin';
export const DATABASE_PASS = process.env.DATABASE_PASS || 'password';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'dev';
export const DATABASE_HOST = process.env.DATABASE_HOST || 'host';
export const DATABASE_URI =
	process.env.DATABASE_URI ||
	`mongodb://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_NETWORK_PORT}/${DATABASE_NAME}`;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const AUTH_TOKEN_EXPIRES_IN = process.env.AUTH_TOKEN_EXPIRES_IN || '1d';
export const REFRESH_TOKEN_EXPIRES_IN =
	process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
