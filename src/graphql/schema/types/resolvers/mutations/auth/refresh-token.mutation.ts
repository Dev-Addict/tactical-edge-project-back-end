import {mutationField, nonNull} from 'nexus';

import {AuthService} from '../../../../../../services/auth/auth.service';

export const refreshToken = mutationField('refreshToken', {
	type: nonNull('AuthResponse'),
	args: {
		input: nonNull('RefreshTokenInput'),
	},
	description: 'Refresh a user token.',
	resolve: async (_parent, {input: {refreshToken}}) => {
		return await AuthService.getInstance().refreshToken(refreshToken);
	},
});
