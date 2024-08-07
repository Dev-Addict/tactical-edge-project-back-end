import {Request} from 'express';

import {protect} from '../../../../services/auth/helpers/protect.helper';
import {User} from '../../../../models/user/user.model';
import {AuthService} from '../../../../services/auth/auth.service';
import {JwtService} from '../../../../services/jwt.service';
import {AppError} from '../../../../utils/app-error.util';

describe('protect', () => {
	let req: Request;

	beforeEach(() => {
		req = {
			headers: {
				authorization: 'Bearer valid.token.here',
			},
		} as Request;
	});

	it('should throw an error if authorization header is missing and force is true', async () => {
		req.headers.authorization = undefined;
		await expect(
			protect.call(AuthService.getInstance(), req, true)
		).rejects.toThrow(AppError);
	});

	it('should throw an error if authorization header does not start with Bearer and force is true', async () => {
		req.headers.authorization = 'Invalid token';

		await expect(protect.call(AuthService.getInstance(), req)).rejects.toThrow(
			AppError
		);
	});

	it('should throw an error if token is missing and force is true', async () => {
		req.headers.authorization = 'Bearer ';

		await expect(protect.call(AuthService.getInstance(), req)).rejects.toThrow(
			AppError
		);
	});

	it('should return undefined if authorization header is missing and force is false', async () => {
		req.headers.authorization = undefined;
		const result = await protect.call(AuthService.getInstance(), req, false);
		expect(result).toBeUndefined();
	});

	it('should return undefined if token is missing and force is false', async () => {
		req.headers.authorization = 'Bearer ';
		const result = await protect.call(AuthService.getInstance(), req, false);
		expect(result).toBeUndefined();
	});

	it('should throw an error if user is not found and force is true', async () => {
		JwtService.getInstance().verifyToken = jest
			.fn()
			.mockResolvedValue({id: '123'});
		User.findById = jest.fn().mockResolvedValue(null);
		await expect(protect.call(AuthService.getInstance(), req)).rejects.toThrow(
			AppError
		);
	});

	it('should return undefined if user is not found and force is false', async () => {
		JwtService.getInstance().verifyToken = jest
			.fn()
			.mockResolvedValue({id: '123'});
		User.findById = jest.fn().mockResolvedValue(null);
		const result = await protect.call(AuthService.getInstance(), req, false);
		expect(result).toBeUndefined();
	});

	it('should set req.user and return the user if user is found', async () => {
		const mockUser = {id: '123', name: 'John Doe'};
		JwtService.getInstance().verifyToken = jest
			.fn()
			.mockResolvedValue({id: '123'});
		User.findById = jest.fn().mockResolvedValue(mockUser);
		const result = await protect.call(AuthService.getInstance(), req);
		expect(req.user).toEqual(mockUser);
		expect(result).toEqual(mockUser);
	});
});
