import {queryField} from 'nexus';

export const pingQuery = queryField('ping', {
	type: 'String',
	description: `Ping query to check if the server is running.`,
	resolve: () => 'pong',
});
