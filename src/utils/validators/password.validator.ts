/**
 * Validate password
 * @param password - The password to validate.
 * @returns True if the password is valid, false otherwise.
 */
export const validatePassword = (password: unknown): boolean => {
	if (typeof password !== 'string') return false;

	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&? "]).{8,128}$/.test(
		password
	);
};
