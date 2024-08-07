import {Request} from 'express';

import {updateSelf} from '../../../../services/auth/helpers/update-self.helper';
import {AuthService} from '../../../../services/auth/auth.service';
import {IUser} from '../../../../models/user/user.model';

describe('updateSelf', () => {
	let mockAuthService: jest.Mocked<AuthService>;
	let req: Request;
	let mockUser: IUser;

	beforeEach(() => {
		mockAuthService = AuthService.getInstance() as jest.Mocked<AuthService>;
		mockUser = {
			save: jest.fn().mockResolvedValue({}),
			visible: true,
		} as unknown as IUser;
		req = {
			user: mockUser,
		} as Request;
	});

	it('should update the user visibility and save the user', async () => {
		const payload = {visible: false};
		const result = await updateSelf.call(mockAuthService, req, payload);

		expect(req.user.visible).toBe(false);
		expect(req.user.save).toHaveBeenCalled();
		expect(result).toEqual(req.user);
	});

	it('should not update the user visibility if it is undefined in the payload', async () => {
		const payload = {};
		const result = await updateSelf.call(mockAuthService, req, payload);

		expect(req.user.visible).toBe(true);
		expect(req.user.save).toHaveBeenCalled();
		expect(result).toEqual(req.user);
	});
});
