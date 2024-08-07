/**
 * Payload for JWT Auth Service
 * @interface JwtAuthPayload
 * @property {string} id - The user ID.
 * @property {boolean} refresh - Whether the token is a refresh token.
 */
export interface JwtAuthPayload {
	id: string;
	refresh: boolean;
}
