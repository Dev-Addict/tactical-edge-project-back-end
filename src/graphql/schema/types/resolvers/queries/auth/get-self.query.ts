import {queryField} from 'nexus';

import {AuthService} from '../../../../../../services/auth/auth.service';

export const getSelf = queryField('getSelf', {
	type: 'User',
	description: 'Get the currently authenticated user.',
	resolve: async (_parent, _args, {req}) => {
		await AuthService.getInstance().protect(req);

		return req.user;
	},
});
