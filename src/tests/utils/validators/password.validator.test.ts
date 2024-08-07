import {validatePassword} from '../../../utils/validators/password.validator';

describe('Password Validator', () => {
	it('should return false if input is not string', () => {
		const password = 123;
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password is less than 8 characters', () => {
		const password = 'Aa1!';
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password is more than 128 characters', () => {
		const password = 'Aa1!'.repeat(32) + 'A';
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password does not contain a lowercase letter', () => {
		const password = 'AA1!AAAA';
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password does not contain an uppercase letter', () => {
		const password = 'aa1!aaaa';
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password does not contain a number', () => {
		const password = 'Aa!AAAAA';
		const result = validatePassword(password);
		expect(result).toBe(false);
	});

	it('should return false if the password does not contain a special character', () => {
		const password = 'Aa1AAAAA';
	});

	it('should return true if the password is valid', () => {
		const password = 'Aa1!AAAA';
		const result = validatePassword(password);
		expect(result).toBe(true);
	});

	it('should return true if the password is valid with 64 characters', () => {
		const password = 'Aa1!'.repeat(16);
		const result = validatePassword(password);
		expect(result).toBe(true);
	});

	it('should return true if the password is valid with 128 characters', () => {
		const password = 'Aa1!'.repeat(32);
		const result = validatePassword(password);
		expect(result).toBe(true);
	});

	it('should return true for any order of characters', () => {
		let password = 'AAaa11!!';
		let result = validatePassword(password);
		expect(result).toBe(true);

		password = 'aa11AA!!';
		result = validatePassword(password);
		expect(result).toBe(true);

		password = '11AAaa!!';
		result = validatePassword(password);
		expect(result).toBe(true);

		password = '!!AAaa11';
		result = validatePassword(password);
		expect(result).toBe(true);

		password = 'AAaa!!11';
		result = validatePassword(password);
		expect(result).toBe(true);
	});
});
