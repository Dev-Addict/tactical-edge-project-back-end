import httpStatus from 'http-status';

import {LoggerService} from '../services/logger.service';
import {Status} from '../types/enums/status.enum';
import {IS_DEV} from '../env';

/**
 * AppError class representing a error created by the developer.
 * @extends Error
 * @property {boolean} [isOperational=true] - Indicates if the error is operational the default is true that represents the error was created by the developer.
 * @property {Status} status - Represents the status of the error.
 * @property {number} code - Represents the status code of the error.
 */
export class AppError extends Error {
	public readonly isOperational = true;
	public readonly status: Status;

	/**
	 * Creates an instance of AppError.
	 * @param {string} error - The error message from known error message codes found in errors.yml.
	 * @param {number} [code=httpStatus.INTERNAL_SERVER_ERROR] - The status code of the error.
	 */
	constructor(
		error: string,
		public readonly code: number = httpStatus.INTERNAL_SERVER_ERROR
	) {
		super(error);

		this.status = this.code >= 500 ? Status.ERROR : Status.FAIL;

		if (IS_DEV) LoggerService.getInstance(__filename).error(error, this.stack);
	}
}
