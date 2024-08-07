import {Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

import {validateEmail} from '../../utils/validators/email.validator';
import {validatePassword} from '../../utils/validators/password.validator';

/**
 * User model
 * @property {string} email.required - User's email
 * @property {string} password.required - User's password
 * @property {boolean,default=false} private - Whether the user's profile is visible or not
 */
export interface UserModel {
	email: string;
	password: string;
	visible: boolean;
}

/**
 * User document
 * @extends UserModel
 * @extends Document
 * @property {function} correctPassword - Check if the password matches the encrypted password
 */
export interface IUser extends UserModel, Document {
	correctPassword(
		candidatePassword: string,
		userPassword: string
	): Promise<boolean>;
}

export const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			validate: validateEmail,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			validate: validatePassword,
			required: true,
		},
		visible: {
			type: Boolean,
			default: false,
		},
	},
	{timestamps: true}
);

userSchema.index({email: 1}, {unique: true});

/**
 * Check if the password matches the encrypted password
 * @param candidatePassword - The password to check
 * @param userPassword - The encrypted password
 * @returns True if the password matches, false otherwise
 */
userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Hash the password before saving the user
 */
userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next && next();

	if (this.password) this.password = await bcrypt.hash(this.password, 12);

	if (next) next();
});

export const User = model<IUser>('User', userSchema);
