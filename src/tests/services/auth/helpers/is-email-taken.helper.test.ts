import {isEmailTaken} from '../../../../services/auth/helpers/is-email-taken.helper';
import {User} from '../../../../models/user/user.model';
import {AuthService} from '../../../../services/auth/auth.service';

describe('isEmailTaken', () => {
	it('should return true if email is taken', async () => {
		User.findOne = jest.fn().mockReturnValue({
			_id: '123',
			select: jest.fn().mockReturnValue({
				_id: '123',
				lean: jest.fn().mockReturnValue(true),
			}),
		});
		const result = await isEmailTaken.call(
			AuthService.getInstance(),
			'test@example.com'
		);
		expect(result).toBe(true);
	});

	it('should return false if email is not taken', async () => {
		User.findOne = jest.fn().mockReturnValue({
			select: jest.fn().mockReturnValue({
				lean: jest.fn().mockReturnValue(false),
			}),
		});
		const result = await isEmailTaken.call(
			AuthService.getInstance(),
			'test@example.com'
		);
		expect(result).toBe(false);
	});
});
