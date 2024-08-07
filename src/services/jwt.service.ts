import {Secret, sign, verify} from 'jsonwebtoken';

import {JWT_SECRET} from '../env';

/**
 * Service to handle JWT operations.
 */
export class JwtService {
	/**
	 * The instance of the JwtService.
	 * @private
	 */
	private static instance: JwtService;

	/**
	 * Gets the instance of the JwtService.
	 * @returns {JwtService} The instance of the JwtService.
	 * @static
	 */
	static getInstance(): JwtService {
		if (!this.instance) this.instance = new JwtService();

		return this.instance;
	}

	/**
	 * The secret key for the JWT.
	 * @private
	 */
	private readonly secret: Secret;

	/**
	 * Creates an instance of the JwtService.
	 * @private
	 */
	private constructor() {
		this.secret = JWT_SECRET;
	}

	/**
	 * Sign a token with the given data.
	 * @param data - The data to sign.
	 * @param expiresIn - The expiry time for the token.
	 * @returns {string} The signed token.
	 */
	signToken<T extends string | Buffer | object>(
		data: T,
		expiresIn?: number | string
	): Promise<string> {
		return new Promise((resolve, reject) =>
			sign(data, this.secret, {expiresIn}, (error, token) =>
				error || !token ? reject(error) : resolve(token)
			)
		);
	}

	/**
	 * Verify a token and return the data.
	 * @param token - The token to verify.
	 * @param enforce - Whether to enforce the verification.
	 * @returns {Promise<T>} The data from the token.
	 * @template T - The type of the data.
	 */
	verifyToken<T extends string | Buffer | object>(
		token: string,
		enforce = true
	): Promise<T> {
		return new Promise((resolve, reject) =>
			verify(token, this.secret, (error, data) =>
				error
					? enforce
						? reject(error)
						: resolve({} as T)
					: resolve(data as T)
			)
		);
	}
}
