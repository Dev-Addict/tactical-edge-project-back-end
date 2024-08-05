import {sep} from 'path';
import winston, {format, Logger, transports} from 'winston';

import {IS_DEV} from '../env';
import {LogLevel} from '../types/enums/log-level.enum';

/**
 * LoggerService class to handle logging.
 * @property {Logger} logger - The logger object.
 * @property {string} scope - The scope of the logger.
 */
export class LoggerService {
	/**
	 * The instances of the LoggerService.
	 * @private
	 */
	private static instances: {[k: string]: LoggerService} = {};
	/**
	 * The default scope of the logger.
	 */
	public static DEFAULT_SCOPE = 'app';

	/**
	 * Parses the path to a scope.
	 * @param {string} filepath - The path of the file.
	 * @returns {string} The scope of the logger.
	 */
	private static parsePathToScope(filepath: string = 'unknown'): string {
		if (filepath.indexOf(sep) >= 0) {
			filepath = filepath.replace(process.cwd(), '');
			filepath = filepath.replace(`${sep}src${sep}`, '');
			filepath = filepath.replace(`${sep}dist${sep}`, '');
			filepath = filepath.replace('.ts', '');
			filepath = filepath.replace('.js', '');
			filepath = filepath.replace(sep, ':');
		}

		return filepath;
	}

	/**
	 * Gets the instance of the LoggerService.
	 * @param {string} [scope=DEFAULT_SCOPE] - The scope of the logger.
	 * @returns {LoggerService} The instance of the Logger
	 * @static
	 * @example
	 * LoggerService.getInstance(__filename).info('Server starting...');
	 */
	public static getInstance(scope: string = this.DEFAULT_SCOPE): LoggerService {
		if (!LoggerService.instances[scope])
			LoggerService.instances[scope] = new LoggerService(scope);
		return LoggerService.instances[scope];
	}

	private logger: Logger;
	private readonly scope: string;

	/**
	 * Creates an instance of LoggerService.
	 * @param {string} scope - The scope of the logger.
	 * @private
	 */
	private constructor(scope: string) {
		this.scope = LoggerService.parsePathToScope(scope);
		this.logger = winston.createLogger({
			level: IS_DEV ? 'debug' : 'info',
			format: IS_DEV
				? format.combine(format.colorize(), format.simple())
				: format.json(),
			transports: [
				new transports.Console({
					handleExceptions: true,
				}),
			],
		});

		this.info('Logger initialized');
	}

	/**
	 * Logs a message.
	 * @param {string} scope - The scope of the logger.
	 * @param {LogLevel} level - The level of the log.
	 * @param {string} message - The message to log.
	 * @param {unknown[]} args - The arguments to log.
	 * @private
	 */
	private log(
		scope: string,
		level: LogLevel,
		message: string,
		args: unknown[]
	) {
		this.logger.log(
			level,
			`[${LoggerService.parsePathToScope(scope)}] ${message}`,
			args
		);
	}

	/**
	 * Logs a message with the level of info.
	 * @param {string} message - The message to log.
	 * @param {unknown[]} args - The arguments to log.
	 */
	public info(message: string, ...args: unknown[]): void {
		this.log(this.scope, LogLevel.INFO, message, args);
	}

	/**
	 * Logs a message with the level of debug.
	 * @param {string} message - The message to log.
	 * @param {unknown[]} args - The arguments to log.
	 */
	public debug(message: string, ...args: unknown[]): void {
		this.log(this.scope, LogLevel.DEBUG, message, args);
	}

	/**
	 * Logs a message with the level of warn.
	 * @param {string} message - The message to log.
	 * @param {unknown[]} args - The arguments to log.
	 */
	public warn(message: string, ...args: unknown[]): void {
		this.log(this.scope, LogLevel.WARN, message, args);
	}

	/**
	 * Logs a message with the level of error.
	 * @param {string} message - The message to log.
	 * @param {unknown[]} args - The arguments to log.
	 */
	public error(message: string, ...args: unknown[]): void {
		this.log(this.scope, LogLevel.ERROR, message, args);
	}
}
