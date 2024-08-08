import {nonNull, queryField} from 'nexus';

import {AuthService} from '../../../../../../services/auth/auth.service';

export const isEmailTaken = queryField('isEmailTaken', {
	type: nonNull('Boolean'),
	description: 'Check if an email is taken.',
	args: {
		input: nonNull('IsEmailTakenInput'),
	},
	resolve: async (_parent, {input: {email}}) => {
		return await AuthService.getInstance().isEmailTaken(email);
	},
});
