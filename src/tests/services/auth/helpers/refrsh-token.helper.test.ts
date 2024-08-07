import {refreshToken} from '../../../../services/auth/helpers/refresh-token.helper';
import {JwtService} from '../../../../services/jwt.service';
import {User} from '../../../../models/user/user.model';

describe('refreshToken', () => {
	let mockJwtService: jest.Mocked<JwtService>;

	beforeEach(() => {
		mockJwtService = JwtService.getInstance() as jest.Mocked<JwtService>;
	});

	it('should throw an error if refresh token is invalid', async () => {
		mockJwtService.verifyToken = jest.fn().mockRejectedValue(new Error());
		await expect(refreshToken('invalid.token')).rejects.toThrow();
	});

	it('should throw an error if user is not found', async () => {
		mockJwtService.verifyToken = jest
			.fn()
			.mockResolvedValue({id: '123', refresh: true});
		User.findById = jest.fn().mockResolvedValue(null);
		await expect(refreshToken('valid.token')).rejects.toThrow('0xE000004');
	});

	it('should return new token, refresh token, and user if refresh token is valid and user is found', async () => {
		const mockUser = {id: '123', name: 'John Doe'};
		mockJwtService.verifyToken = jest
			.fn()
			.mockResolvedValue({id: '123', refresh: true});
		User.findById = jest.fn().mockResolvedValue(mockUser);
		mockJwtService.signToken = jest
			.fn()
			.mockResolvedValueOnce('new.token')
			.mockResolvedValueOnce('new.refresh.token');

		const result = await refreshToken('valid.token');
		expect(result).toEqual({
			token: 'new.token',
			refreshToken: 'new.refresh.token',
			user: mockUser,
		});
	});
});
