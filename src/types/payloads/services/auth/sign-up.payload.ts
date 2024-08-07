/**
 * Payload for SignUp service
 * @interface SignUpPayload
 * @param email.required - The email of the user.
 * @param password.required - The password of the user.
 * @param visible - The visibility of the user.
 * @param rememberMe - The remember me option.
 */
export interface SignUpPayload {
	email: string;
	password: string;
	visible?: boolean;
	rememberMe?: boolean;
}
