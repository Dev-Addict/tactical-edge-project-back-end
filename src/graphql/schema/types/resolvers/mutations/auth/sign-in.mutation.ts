import {mutationField, nonNull} from 'nexus';

import {AuthService} from '../../../../../../services/auth/auth.service';

export const signIn = mutationField('signIn', {
	type: nonNull('AuthResponse'),
	args: {
		input: nonNull('SignInInput'),
	},
	description: 'Sign in a user.',
	resolve: async (_parent, {input}) => {
		return await AuthService.getInstance().signIn(input);
	},
});
