import {AppError} from '../../utils/app-error.util';
import {Status} from '../../types/enums/status.enum';

describe('AppError class', () => {
	let appError: AppError;

	beforeAll(() => {
		appError = new AppError('0xE000000', 400);
	});

	it('should be instance of Error', () => {
		expect(appError).toBeInstanceOf(Error);
	});

	it('should have isOperational property', () => {
		expect(appError.isOperational).toBeDefined();
	});

	it('should have isOperational property set to `true`', () => {
		expect(appError.isOperational).toBe(true);
	});

	it('should have code property', () => {
		expect(appError.code).toBeDefined();
	});

	it('should have code property set to 400', () => {
		expect(appError.code).toBe(400);
	});

	it('should have status property', () => {
		expect(appError.status).toBeDefined();
	});

	it('should have status property set to `Status.FAIL`', () => {
		expect(appError.status).toBe(Status.FAIL);
	});

	it('should have message property', () => {
		expect(appError.message).toBeDefined();
	});

	it('should have message property set to `0xE000000`', () => {
		expect(appError.message).toBe('0xE000000');
	});

	it('should have stack property', () => {
		expect(appError.stack).toBeDefined();
	});
});
