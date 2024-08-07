const winston = jest.createMockFromModule('winston') as jest.Mocked<
	typeof import('winston')
>;

winston.createLogger = jest.fn().mockReturnValue({
	log: jest.fn(),
});

export const format = {
	combine: jest.fn(),
	colorize: jest.fn(),
	simple: jest.fn(),
};

export const transports = {
	Console: jest.fn(),
};

export default winston;
