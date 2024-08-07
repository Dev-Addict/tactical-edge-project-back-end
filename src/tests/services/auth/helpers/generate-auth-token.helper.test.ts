import {AuthService} from '../../../../services/auth/auth.service';
import {IUser, UserModel} from '../../../../models/user/user.model';
import {JwtService} from '../../../../services/jwt.service';
import {JwtAuthPayload} from '../../../../types/payloads/services/auth/jwt-auth.payload';
import {generateAuthToken} from '../../../../services/auth/helpers/generate-auth-token.helper';

describe('generateAuthToken', () => {
	let user: UserModel & {id: string};

	beforeAll(() => {
		user = {
			id: 'userId',
			email: 'test@example.com',
			password: 'password',
			visible: false,
		};
		(JwtService.getInstance().signToken as jest.Mock) = jest.fn();
	});

	it('should generate a new auth token', async () => {
		const token = 'authToken';
		const payload: JwtAuthPayload = {id: user.id, refresh: false};
		(JwtService.getInstance().signToken as jest.Mock).mockResolvedValue(token);

		const result = await generateAuthToken.call(
			AuthService.getInstance(),
			user as unknown as IUser
		);
		expect(result).toBe(token);
		expect(JwtService.getInstance().signToken).toHaveBeenCalledWith(
			payload,
			process.env.AUTH_TOKEN_EXPIRES_IN
		);
	});

	it('should generate a new auth token with refresh', async () => {
		const token = 'authToken';
		const payload: JwtAuthPayload = {id: user.id, refresh: true};
		(JwtService.getInstance().signToken as jest.Mock).mockResolvedValue(token);

		const result = await generateAuthToken.call(
			AuthService.getInstance(),
			user as unknown as IUser,
			true
		);
		expect(result).toBe(token);
		expect(JwtService.getInstance().signToken).toHaveBeenCalledWith(
			payload,
			process.env.REFRESH_TOKEN_EXPIRES_IN
		);
	});

	it('should handle signToken rejection', async () => {
		const error = new Error('signToken error');
		(JwtService.getInstance().signToken as jest.Mock).mockRejectedValue(error);

		await expect(
			generateAuthToken.call(
				AuthService.getInstance(),
				user as unknown as IUser
			)
		).rejects.toThrow(error);
	});
});
