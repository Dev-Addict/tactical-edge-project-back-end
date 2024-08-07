import {Request} from 'express';

import {AuthService} from '../auth.service';
import {IUser} from '../../../models/user/user.model';
import {UpdateSelfPayload} from '../../../types/payloads/services/auth/update-self.payload';

/**
 * Update the user object.
 * @param req - The request object.
 * @param payload - The update payload.
 * @returns The updated user object.
 */
export async function updateSelf(
	this: AuthService,
	req: Request,
	payload: UpdateSelfPayload
): Promise<IUser> {
	if (payload.visible !== undefined) req.user.visible = payload.visible;

	await req.user.save();

	return req.user;
}
