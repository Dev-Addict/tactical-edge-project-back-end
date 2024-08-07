import {Request} from 'express';
import {getSelf} from '../../../../services/auth/helpers/get-self.helper';
import {AuthService} from '../../../../services/auth/auth.service';

describe('getSelf', () => {
	it('should return the user object from the request', () => {
		const req = {
			user: {id: '123', name: 'John Doe'},
		} as unknown as Request;

		const result = getSelf.call(AuthService.getInstance(), req);
		expect(result).toEqual(req.user);
	});

	it('should return undefined if user is not present in the request', () => {
		const req = {} as unknown as Request;

		const result = getSelf.call(AuthService.getInstance(), req);
		expect(result).toBeUndefined();
	});
});
