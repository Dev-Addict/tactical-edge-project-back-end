import {AuthService} from '../auth.service';
import {User} from '../../../models/user/user.model';
import {SignUpPayload} from '../../../types/payloads/services/auth/sign-up.payload';

/**
 * Sign up a new user.
 * @param payload - The sign-up payload.
 * @returns The user, token and refresh token.
 */
export async function signUp(this: AuthService, payload: SignUpPayload) {
	const user = new User(payload);
	await user.save();

	const token = await this.generateAuthToken(user);
	let refreshToken: string | undefined;

	if (payload.rememberMe)
		refreshToken = await this.generateAuthToken(user, true);

	return {user, token, refreshToken};
}
