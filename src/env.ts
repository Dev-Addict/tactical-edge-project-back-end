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
