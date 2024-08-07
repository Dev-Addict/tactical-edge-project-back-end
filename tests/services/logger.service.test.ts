import {LoggerService} from '../../src/services/logger.service';

describe('LoggerService class', () => {
	it('should have info method', () => {
		expect(LoggerService.getInstance('test').info).toBeDefined();
	});

	it('should log an info message', () => {
		const infoSpy = jest.spyOn(LoggerService.getInstance('test'), 'info');
		LoggerService.getInstance('test').info('test');
		expect(infoSpy).toHaveBeenCalled();
	});

	it('should have debug method', () => {
		expect(LoggerService.getInstance('test').debug).toBeDefined();
	});

	it('should log a debug message', () => {
		const debugSpy = jest.spyOn(LoggerService.getInstance('test'), 'debug');
		LoggerService.getInstance('test').debug('test');
		expect(debugSpy).toHaveBeenCalled();
	});

	it('should have warn method', () => {
		expect(LoggerService.getInstance('test').warn).toBeDefined();
	});

	it('should log a warn message', () => {
		const warnSpy = jest.spyOn(LoggerService.getInstance('test'), 'warn');
		LoggerService.getInstance('test').warn('test');
		expect(warnSpy).toHaveBeenCalled();
	});

	it('should have error method', () => {
		expect(LoggerService.getInstance('test').error).toBeDefined();
	});

	it('should log an error message', () => {
		const errorSpy = jest.spyOn(LoggerService.getInstance('test'), 'error');
		LoggerService.getInstance('test').error('test');
		expect(errorSpy).toHaveBeenCalled();
	});
});
