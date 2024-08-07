import {Request} from 'express';

import {AuthService} from '../auth.service';

/**
 * Get the user object.
 * @param req - The request object.
 * @returns The user object.
 */
export function getSelf(this: AuthService, req: Request) {
	return req.user;
}
