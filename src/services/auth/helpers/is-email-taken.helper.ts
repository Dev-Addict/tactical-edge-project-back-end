import {AuthService} from '../auth.service';
import {User} from '../../../models/user/user.model';

/**
 * Checks if an email is taken.
 * @param email - The email to check.
 * @returns {Promise<boolean>} Whether the email is taken.
 */
export async function isEmailTaken(
	this: AuthService,
	email: string
): Promise<boolean> {
	return (await User.findOne({email}).select({_id: 1}).lean()) || false;
}
