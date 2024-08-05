import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

import {server} from '../app';
import {mainSchema} from './schema/main.schema';
import {MainContext} from './schema/main.context';

export const graphqlServer = new ApolloServer<MainContext>({
	schema: mainSchema,
	cache: 'bounded',
	csrfPrevention: true,
	plugins: [ApolloServerPluginDrainHttpServer({httpServer: server})],
});
