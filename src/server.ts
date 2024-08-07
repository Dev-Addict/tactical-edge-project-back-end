import './env';

import {expressMiddleware} from '@apollo/server/express4';

import {app, server} from './app';
import {graphqlServer} from './graphql/server';
import {LoggerService} from './services/logger.service';
import {loadDatabase} from './utils/loaders/database.loader';
import {getMainContext, MainContext} from './graphql/schema/main.context';
import {SERVER_DOCKER_PORT, SERVER_NETWORK_PORT} from './env';

(async () => {
	await loadDatabase();

	LoggerService.getInstance(__filename).info('Server starting...');

	await graphqlServer.start();
	app.use(
		'/api/graphql',
		expressMiddleware<MainContext>(graphqlServer, {
			context: getMainContext,
		})
	);

	server.listen(SERVER_DOCKER_PORT, (err?: unknown) => {
		if (err) {
			LoggerService.getInstance(__filename).error(
				'Failed to start the server.',
				err
			);
			process.exit(1);
		}

		LoggerService.getInstance(__filename).info(
			`Server is running on http://localhost:${SERVER_NETWORK_PORT}`
		);
	});
})();
