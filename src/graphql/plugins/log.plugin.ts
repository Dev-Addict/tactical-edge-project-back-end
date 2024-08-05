import {plugin} from 'nexus';
import {LoggerService} from '../../services/logger.service';

/**
 * LogPlugin class representing a plugin to log the time of the field resolver.
 */
export const LogPlugin = plugin({
	name: 'LogPlugin',
	onCreateFieldResolver(config) {
		if (!['Mutation', 'Query'].includes(config.parentTypeConfig.name)) return;

		return async (root, args, ctx, info, next) => {
			const startTime = Date.now();

			const value = await next(root, args, ctx, info);

			const endTime = Date.now();

			LoggerService.getInstance(__filename).info(
				`[${config.parentTypeConfig.name}] ${config.fieldConfig.name} ${
					endTime - startTime
				}ms`
			);

			return value;
		};
	},
});
