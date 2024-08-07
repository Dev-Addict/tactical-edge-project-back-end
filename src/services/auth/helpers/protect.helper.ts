import {Request} from 'express';

import {AuthService} from '../auth.service';
import {AppError} from '../../../utils/app-error.util';
import {JwtService} from '../../jwt.service';
import {User} from '../../../models/user/user.model';
import {JwtAuthPayload} from '../../../types/payloads/services/auth/jwt-auth.payload';

/**
 * Protects a route.
 * @param req - The request object.
 * @param force - Whether to force protection.
 * @returns The user object.
 */
export async function protect(this: AuthService, req: Request, force = true) {
	const bearer = req.headers.authorization;

	if (!bearer && !force) return;
	if (!bearer) throw new AppError('0xE000003', 401);
	if (!bearer.startsWith('Bearer ') && force)
		throw new AppError('0xE000003', 401);

	const token = bearer.split(' ')[1];

	if (!token && !force) return;
	if (!token) throw new AppError('0xE000003', 401);

	const {id} =
		await JwtService.getInstance().verifyToken<JwtAuthPayload>(token);
	const user = await User.findById(id);

	if (!user && !force) return;
	if (!user) throw new AppError('0xE000003', 401);

	req.user = user;

	return user;
}
