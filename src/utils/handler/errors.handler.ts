import {NextFunction, Request, Response} from 'express';

import {LoggerService} from '../../services/logger.service';
import {AppError} from '../app-error.util';
import {IS_DEV} from '../../env';

/**
 * Middleware to handle errors.
 * @param err - The error object.
 * @param _ - The request object.
 * @param res - The response object.
 * @param __ - The next function.
 */
export const errorsMiddleware = (
	err: Error,
	_: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	__: NextFunction
) => {
	if (!(err instanceof AppError)) {
		LoggerService.getInstance(__filename).error(err.message, err.stack);

		return IS_DEV
			? res.status(500).json(err)
			: res.status(500).send({
					message: '0xE000001',
				});
	}

	return res.status(err.code).send({message: err.message});
};
