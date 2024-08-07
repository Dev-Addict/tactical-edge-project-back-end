import {connect} from 'mongoose';

import {DATABASE_URI} from '../../env';
import {LoggerService} from '../../services/logger.service';

export const loadDatabase = async () => {
	try {
		await connect(DATABASE_URI + '?authSource=admin');

		LoggerService.getInstance(__filename).info('Database connected');
	} catch (error) {
		LoggerService.getInstance(__filename).error(
			'Database connection failed',
			error
		);
	}
};
