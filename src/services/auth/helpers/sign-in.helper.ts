import {User} from '../../../models/user/user.model';
import {AuthService} from '../auth.service';
import {AppError} from '../../../utils/app-error.util';
import {SignInPayload} from '../../../types/payloads/services/auth/sign-in.payload';

/**
 * Sign in a user.
 * @param payload - The sign-in payload.
 * @returns The user, token and refresh token.
 */
export async function signIn(this: AuthService, payload: SignInPayload) {
	const user = await User.findOne({email: payload.email});

	if (!user) throw new AppError('0xE000002', 401);

	if (!(await user.correctPassword(payload.password, user.password)))
		throw new AppError('0xE000002', 401);

	const token = await this.generateAuthToken(user);
	let refreshToken: string | undefined;

	if (payload.rememberMe)
		refreshToken = await this.generateAuthToken(user, true);

	return {user, token, refreshToken};
}
