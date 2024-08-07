/**
 * Payload for sign in service
 * @interface SignInPayload
 * @param email.required - The email of the user.
 * @param password.required - The password of the user.
 * @param rememberMe - The remember me option.
 */
export interface SignInPayload {
	email: string;
	password: string;
	rememberMe?: boolean;
}
