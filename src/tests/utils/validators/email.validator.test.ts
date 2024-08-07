import {validateEmail} from '../../../utils/validators/email.validator';

describe('Email Validator', () => {
	it('should return false if input is not string', () => {
		const email = 123;
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return true if the email is valid', () => {
		const email = 'name@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	it('should return true if the email is valid with a subdomain', () => {
		const email = 'name@sub.domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	it('should return true if the email is valid with the quoted name', () => {
		const email = '"name"@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	it('should return true if the email is valid with a local part longer than 64 characters', () => {
		const email = 'a'.repeat(65) + '@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	it('should return true if the email is valid with quoted local part', () => {
		const email = '"verylongname"@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	it('should return true if the email is valid with an alphanumeric domain', () => {
		const email = 'name@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});

	// Add invalid email test cases
	it('should return false for invalid email: name@domain', () => {
		const email = 'name@domain';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@domain.', () => {
		const email = 'name@domain.';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@domain.c', () => {
		const email = 'name@domain.c';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@-domain.com', () => {
		const email = 'name@-domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@_domain.com', () => {
		const email = 'name@_domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@domain-.com', () => {
		const email = 'name@domain-.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@domain.com_', () => {
		const email = 'name@domain.com_';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@.domain.com', () => {
		const email = 'name@.domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email: name@domain..com', () => {
		const email = 'name@domain..com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with multiple @ symbols: name@domain@domain.com', () => {
		const email = 'name@domain@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with spaces: name @ domain.com', () => {
		const email = 'name @ domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with invalid quoted name: “”name””@domain.com', () => {
		const email = '“”name””@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with missing quoted name: “name”@domain@com', () => {
		const email = '“name”@domain@com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with unbalanced quotes: “name”@domain”com', () => {
		const email = '“name”@domain”com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with a domain part longer than 256 characters: name@verylongdomainpart.com_', () => {
		const email = 'name@' + 'a'.repeat(257) + '.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with quoted local part longer than 64 characters: “verylongname”@domain.com_', () => {
		const email = '"a'.repeat(66) + '"@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with an invalid IP address domain: name@123.123.123.1234', () => {
		const email = 'name@123.123.123.1234';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with only a numeric domain: name@123', () => {
		const email = 'name@123';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with missing @ symbol: namedomain.com', () => {
		const email = 'namedomain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with an extra @ symbol: name@domain@com', () => {
		const email = 'name@domain@com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with missing . in the domain: name@domaincom', () => {
		const email = 'name@domaincom';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with consecutive . in the domain: name@domain..com', () => {
		const email = 'name@domain..com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading . in the domain: name@.domain.com', () => {
		const email = 'name@.domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing . in the domain: name@domain.com.', () => {
		const email = 'name@domain.com.';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading – in the domain: name@-domain.com', () => {
		const email = 'name@-domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing – in the domain: name@domain-.com', () => {
		const email = 'name@domain-.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading _ in domain: name@_domain.com', () => {
		const email = 'name@_domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing _ in domain: name@domain.com_', () => {
		const email = 'name@domain.com_';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading – in local part: name@domain.-com', () => {
		const email = 'name@domain.-com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing – in local part: name@domain.com-', () => {
		const email = 'name@domain.com-';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading _ in the local part: name@domain._com', () => {
		const email = 'name@domain._com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing _ in local part: name@domain.com_', () => {
		const email = 'name@domain.com_';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading – in quoted local part: “name”-@domain.com', () => {
		const email = '“name”-@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing – in quoted local part: “name”@domain.com-', () => {
		const email = '“name”@domain.com-';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with leading _ in quoted local part: “_name”@domain.com', () => {
		const email = '“_name”@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with trailing _ in quoted local part: “name_”@domain.com', () => {
		const email = '“name_”@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with a missing domain: name@', () => {
		const email = 'name@';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with a missing local part: @domain.com', () => {
		const email = '@domain.com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});

	it('should return false for invalid email with two consecutive dots in the domain', () => {
		const email = 'name@domain..com';
		const result = validateEmail(email);
		expect(result).toBe(false);
	});
});
