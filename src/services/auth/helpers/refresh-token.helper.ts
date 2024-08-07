import {JwtService} from '../../jwt.service';
import {IUser, User} from '../../../models/user/user.model';
import {AppError} from '../../../utils/app-error.util';
import {JwtAuthPayload} from '../../../types/payloads/services/auth/jwt-auth.payload';

/**
 * Refresh the token with the given refresh token.
 * @param refreshToken - The refresh token to use.
 * @returns {Promise<{token: string; refreshToken: string; user: IUser}>} The new token, refresh token, and user.
 */
export async function refreshToken(
	refreshToken: string
): Promise<{token: string; refreshToken: string; user: IUser}> {
	const {id, refresh} =
		await JwtService.getInstance().verifyToken<JwtAuthPayload>(refreshToken);

	if (!refresh) throw new AppError('0xE000004', 401);

	const user = await User.findById(id);

	if (!user) throw new AppError('0xE000004', 401);

	const token = await JwtService.getInstance().signToken<JwtAuthPayload>({
		id,
		refresh: false,
	});
	refreshToken = await JwtService.getInstance().signToken<JwtAuthPayload>({
		id,
		refresh: true,
	});

	return {token, refreshToken, user};
}
