import {mutationField, nonNull} from 'nexus';
import {AuthService} from '../../../../../../services/auth/auth.service';

export const updateSelf = mutationField('updateSelf', {
	type: nonNull('User'),
	args: {
		input: nonNull('UpdateSelfInput'),
	},
	description: 'Update the authenticated user.',
	resolve: async (_parent, {input}, {req}) => {
		await AuthService.getInstance().protect(req);

		return await AuthService.getInstance().updateSelf(req, input);
	},
});
