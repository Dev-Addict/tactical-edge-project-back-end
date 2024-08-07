import {AuthService} from '../auth.service';
import {JwtService} from '../../jwt.service';
import {AUTH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN} from '../../../env';
import {IUser} from '../../../models/user/user.model';
import {JwtAuthPayload} from '../../../types/payloads/services/auth/jwt-auth.payload';

/**
 * Generate a new auth token.
 * @param user - The user object.
 * @param refresh - Whether to generate a refresh token.
 * @returns {Promise<string>} The auth token.
 */
export function generateAuthToken(
	this: AuthService,
	user: IUser,
	refresh = false
): Promise<string> {
	const payload: JwtAuthPayload = {id: user.id, refresh};

	return JwtService.getInstance().signToken<JwtAuthPayload>(
		payload,
		refresh ? REFRESH_TOKEN_EXPIRES_IN : AUTH_TOKEN_EXPIRES_IN
	);
}
