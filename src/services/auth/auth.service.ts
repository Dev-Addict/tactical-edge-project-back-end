import {generateAuthToken} from './helpers/generate-auth-token.helper';
import {getSelf} from './helpers/get-self.helper';
import {protect} from './helpers/protect.helper';
import {refreshToken} from './helpers/refresh-token.helper';
import {signIn} from './helpers/sign-in.helper';
import {signUp} from './helpers/sign-up.helper';
import {updateSelf} from './helpers/update-self.helper';
import {isEmailTaken} from './helpers/is-email-taken.helper';

/**
 * The service for authentication.
 */
export class AuthService {
	/**
	 * The instance of the AuthService.
	 * @private
	 */
	private static instance: AuthService;

	/**
	 * Gets the instance of the AuthService.
	 * @returns {AuthService} The instance of the AuthService.
	 * @static
	 */
	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}

		return AuthService.instance;
	}

	/**
	 * Creates an instance of the AuthService.
	 * @private
	 */
	private constructor() {}

	/**
	 * Generate a new auth token.
	 * @param user - The user object.
	 * @param refresh - Whether to generate a refresh token
	 * @returns {Promise<string>} The auth token.
	 * @protected
	 */
	protected generateAuthToken = generateAuthToken.bind(this);

	/**
	 * Sign up a new user.
	 * @param payload - The sign-up payload.
	 * @returns {Promise<{user: IUser, token: string, refreshToken?: string}>} The user, token, and refresh token.
	 */
	public signUp = signUp.bind(this);

	/**
	 * Sign in a user.
	 * @param payload - The sign-in payload.
	 * @returns {Promise<{user: IUser, token: string, refreshToken?: string}>} The user, token, and refresh token.
	 */
	public signIn = signIn.bind(this);

	/**
	 * Protects a route.
	 * @param req - The request object.
	 * @param force - Whether to force protection.
	 * @returns The user object.
	 */
	public protect = protect.bind(this);

	/**
	 * Refresh the token with the given refresh token.
	 * @param refreshToken - The refresh token to use.
	 * @returns {Promise<{token: string; refreshToken: string; user: IUser}>} The new token, refresh token, and user.
	 */
	public refreshToken = refreshToken.bind(this);

	/**
	 * Get the user object.
	 * @param req - The request object.
	 * @returns The user object.
	 */
	public getSelf = getSelf.bind(this);

	/**
	 * Update the user object.
	 * @param req - The request object.
	 * @returns The user object.
	 */
	public updateSelf = updateSelf.bind(this);

	/**
	 * Checks if an email is taken.
	 * @param email - The email to check.
	 * @returns {Promise<boolean>} Whether the email is taken.
	 */
	public isEmailTaken = isEmailTaken.bind(this);
}
