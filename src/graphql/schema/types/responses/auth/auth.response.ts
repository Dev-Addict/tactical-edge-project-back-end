import {objectType} from 'nexus';

export const AuthResponse = objectType({
	name: 'AuthResponse',
	description: 'Auth response',
	definition(t) {
		t.nonNull.field('user', {
			type: 'User',
			description: 'User',
		});
		t.nonNull.string('token', {
			description: 'Auth token',
		});
		t.nullable.string('refreshToken', {
			description: 'Refresh token',
		});
	},
});
