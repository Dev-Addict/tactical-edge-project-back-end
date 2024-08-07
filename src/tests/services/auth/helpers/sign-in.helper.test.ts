import {signIn} from '../../../../services/auth/helpers/sign-in.helper';
import {User} from '../../../../models/user/user.model';
import {AuthService} from '../../../../services/auth/auth.service';

describe('signIn', () => {
	let mockAuthService: jest.Mocked<AuthService>;

	beforeEach(() => {
		mockAuthService = AuthService.getInstance() as jest.Mocked<AuthService>;
	});

	it('should throw an error if user is not found', async () => {
		User.findOne = jest.fn().mockResolvedValue(null);
		await expect(
			signIn.call(mockAuthService, {
				email: 'test@example.com',
				password: 'password',
			})
		).rejects.toThrow('0xE000002');
	});

	it('should throw an error if password is incorrect', async () => {
		const mockUser = {correctPassword: jest.fn().mockResolvedValue(false)};
		User.findOne = jest.fn().mockResolvedValue(mockUser);
		await expect(
			signIn.call(mockAuthService, {
				email: 'test@example.com',
				password: 'password',
			})
		).rejects.toThrow('0xE000002');
	});

	it('should return user, token, and refresh token if sign-in is successful and rememberMe is true', async () => {
		const mockUser = {correctPassword: jest.fn().mockResolvedValue(true)};
		User.findOne = jest.fn().mockResolvedValue(mockUser);
		(
			mockAuthService as unknown as {generateAuthToken: () => ''}
		).generateAuthToken = jest
			.fn()
			.mockResolvedValueOnce('token')
			.mockResolvedValueOnce('refreshToken');

		const result = await signIn.call(mockAuthService, {
			email: 'test@example.com',
			password: 'password',
			rememberMe: true,
		});
		expect(result).toEqual({
			user: mockUser,
			token: 'token',
			refreshToken: 'refreshToken',
		});
	});

	it('should return user and token if sign-in is successful and rememberMe is false', async () => {
		const mockUser = {correctPassword: jest.fn().mockResolvedValue(true)};
		User.findOne = jest.fn().mockResolvedValue(mockUser);
		(
			mockAuthService as unknown as {
				generateAuthToken: () => '';
			}
		).generateAuthToken = jest.fn().mockResolvedValue('token');

		const result = await signIn.call(mockAuthService, {
			email: 'test@example.com',
			password: 'password',
			rememberMe: false,
		});
		expect(result).toEqual({
			user: mockUser,
			token: 'token',
			refreshToken: undefined,
		});
	});
});
