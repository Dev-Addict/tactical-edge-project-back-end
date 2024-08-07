import {signUp} from '../../../../services/auth/helpers/sign-up.helper';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/user/user.model';

describe('signUp', () => {
	let mockAuthService: jest.Mocked<AuthService>;

	beforeEach(() => {
		mockAuthService = AuthService.getInstance() as jest.Mocked<AuthService>;
	});

	it('should create a new user and return user, token, and refresh token if rememberMe is true', async () => {
		const mockUser = {save: jest.fn().mockResolvedValue({})};
		User.prototype.save = jest.fn().mockResolvedValue(mockUser);
		(
			mockAuthService as unknown as {
				generateAuthToken: () => '';
			}
		).generateAuthToken = jest
			.fn()
			.mockResolvedValueOnce('token')
			.mockResolvedValueOnce('refreshToken');

		const payload = {
			email: 'test@example.com',
			password: 'password',
			rememberMe: true,
		};
		const result = await signUp.call(mockAuthService, payload);

		expect(result.token).toEqual('token');
		expect(result.refreshToken).toEqual('refreshToken');
		expect(result.user.email).toEqual(payload.email);
		expect(User.prototype.save).toHaveBeenCalled();
		expect(
			(mockAuthService as unknown as {generateAuthToken: () => ''})
				.generateAuthToken
		).toHaveBeenCalledTimes(2);
	});

	it('should create a new user and return user and token if rememberMe is false', async () => {
		const mockUser = {save: jest.fn().mockResolvedValue({})};
		User.prototype.save = jest.fn().mockResolvedValue(mockUser);
		(
			mockAuthService as unknown as {
				generateAuthToken: () => '';
			}
		).generateAuthToken = jest.fn().mockResolvedValue('token');

		const payload = {
			email: 'test@example.com',
			password: 'password',
			rememberMe: false,
		};
		const result = await signUp.call(mockAuthService, payload);

		expect(result.token).toEqual('token');
		expect(result.refreshToken).toBeUndefined();
		expect(result.user.email).toEqual(payload.email);
		expect(User.prototype.save).toHaveBeenCalled();
		expect(
			(mockAuthService as unknown as {generateAuthToken: () => ''})
				.generateAuthToken
		).toHaveBeenCalledTimes(1);
	});
});
