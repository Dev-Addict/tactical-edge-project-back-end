import {sign, verify} from 'jsonwebtoken';

import {JwtService} from '../../services/jwt.service';

jest.mock('jsonwebtoken');

describe('JwtService', () => {
	it('should return a singleton instance', () => {
		const instance1 = JwtService.getInstance();
		const instance2 = JwtService.getInstance();
		expect(instance1).toBe(instance2);
	});

	describe('signToken', () => {
		it('should sign data correctly', async () => {
			const data = {id: 1};
			const token = 'signedToken';
			(sign as jest.Mock).mockImplementation((_, __, ___, callback) => {
				callback(null, token);
			});

			const result = await JwtService.getInstance().signToken(data);
			expect(result).toBe(token);
			expect(sign).toHaveBeenCalledWith(
				data,
				process.env.JWT_SECRET,
				{expiresIn: undefined},
				expect.any(Function)
			);
		});

		it('should reject if signing fails', async () => {
			const data = {id: 1};
			const error = new Error('signing error');
			(sign as jest.Mock).mockImplementation((_, __, ___, callback) => {
				callback(error, null);
			});

			await expect(JwtService.getInstance().signToken(data)).rejects.toThrow(
				error
			);
		});
	});

	describe('verifyToken', () => {
		it('should verify token correctly', async () => {
			const token = 'token';
			const data = {id: 1};
			(verify as jest.Mock).mockImplementation((_, __, callback) => {
				callback(null, data);
			});

			const result = await JwtService.getInstance().verifyToken(token);
			expect(result).toEqual(data);
			expect(verify).toHaveBeenCalledWith(
				token,
				process.env.JWT_SECRET,
				expect.any(Function)
			);
		});

		it('should reject if verification fails and enforce is true', async () => {
			const token = 'token';
			const error = new Error('verification error');
			(verify as jest.Mock).mockImplementation((_, __, callback) => {
				callback(error, null);
			});

			await expect(JwtService.getInstance().verifyToken(token)).rejects.toThrow(
				error
			);
		});

		it('should resolve with empty object if verification fails and enforce is false', async () => {
			const token = 'token';
			const error = new Error('verification error');
			(verify as jest.Mock).mockImplementation((_, __, callback) => {
				callback(error, null);
			});

			const result = await JwtService.getInstance().verifyToken(token, false);
			expect(result).toEqual({});
		});
	});
});
