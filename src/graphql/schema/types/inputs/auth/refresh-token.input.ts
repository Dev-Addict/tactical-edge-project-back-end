import {inputObjectType} from 'nexus';

export const RefreshTokenInput = inputObjectType({
	name: 'RefreshTokenInput',
	description: 'Input type for refreshing a token',
	definition(t) {
		t.nonNull.string('refreshToken', {
			description: 'The refresh token',
		});
	},
});
