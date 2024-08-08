import {mutationField, nonNull} from 'nexus';

import {AuthService} from '../../../../../../services/auth/auth.service';

export const signUp = mutationField('signUp', {
	type: nonNull('AuthResponse'),
	args: {
		input: nonNull('SignUpInput'),
	},
	description: 'Sign up a new user.',
	resolve: async (_parent, {input}) => {
		return await AuthService.getInstance().signUp(input);
	},
});
