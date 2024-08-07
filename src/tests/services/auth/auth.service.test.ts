import {Request} from 'express';

import {AuthService} from '../../../services/auth/auth.service';
import {signUp} from '../../../services/auth/helpers/sign-up.helper';
import {signIn} from '../../../services/auth/helpers/sign-in.helper';
import {protect} from '../../../services/auth/helpers/protect.helper';
import {refreshToken} from '../../../services/auth/helpers/refresh-token.helper';
import {getSelf} from '../../../services/auth/helpers/get-self.helper';
import {updateSelf} from '../../../services/auth/helpers/update-self.helper';

jest.mock('../../../services/auth/helpers/sign-up.helper');
jest.mock('../../../services/auth/helpers/sign-in.helper');
jest.mock('../../../services/auth/helpers/protect.helper');
jest.mock('../../../services/auth/helpers/refresh-token.helper');
jest.mock('../../../services/auth/helpers/get-self.helper');
jest.mock('../../../services/auth/helpers/update-self.helper');

describe('AuthService', () => {
	let authService: AuthService;

	beforeAll(() => {
		authService = AuthService.getInstance();
	});

	it('should return a singleton instance', () => {
		const instance1 = AuthService.getInstance();
		const instance2 = AuthService.getInstance();
		expect(instance1).toBe(instance2);
	});

	it('should call signUp correctly', async () => {
		const payload = {email: 'test@example.com', password: 'password'};
		const response = {
			user: {id: 1},
			token: 'token',
			refreshToken: 'refreshToken',
		};
		(signUp as jest.Mock).mockResolvedValue(response);

		const result = await authService.signUp(payload);
		expect(result).toBe(response);
		expect(signUp).toHaveBeenCalledWith(payload);
	});

	it('should call signIn correctly', async () => {
		const payload = {email: 'test@example.com', password: 'password'};
		const response = {
			user: {id: 1},
			token: 'token',
			refreshToken: 'refreshToken',
		};
		(signIn as jest.Mock).mockResolvedValue(response);

		const result = await authService.signIn(payload);
		expect(result).toBe(response);
		expect(signIn).toHaveBeenCalledWith(payload);
	});

	it('should call protect correctly', () => {
		const req = {user: {id: 1}};
		(protect as jest.Mock).mockReturnValue(req.user);

		const result = authService.protect(req as unknown as Request);
		expect(result).toBe(req.user);
		expect(protect).toHaveBeenCalledWith(req);
	});

	it('should call refreshToken correctly', async () => {
		const token = 'refreshToken';
		const response = {
			token: 'newToken',
			refreshToken: 'newRefreshToken',
			user: {id: 1},
		};
		(refreshToken as jest.Mock).mockResolvedValue(response);

		const result = await authService.refreshToken(token);
		expect(result).toBe(response);
		expect(refreshToken).toHaveBeenCalledWith(token);
	});

	it('should call getSelf correctly', () => {
		const req = {user: {id: 1}};
		(getSelf as jest.Mock).mockReturnValue(req.user);

		const result = authService.getSelf(req as unknown as Request);
		expect(result).toBe(req.user);
		expect(getSelf).toHaveBeenCalledWith(req);
	});

	it('should call updateSelf correctly', async () => {
		const req = {user: {id: 1}};
		(updateSelf as jest.Mock).mockReturnValue({...req.user, visible: true});

		const result = await authService.updateSelf(req as unknown as Request, {
			visible: true,
		});
		expect(result).toEqual({...req.user, visible: true});
		expect(updateSelf).toHaveBeenCalled();
	});
});
