import {inputObjectType} from 'nexus';

export const SignInInput = inputObjectType({
	name: 'SignInInput',
	description: 'Input type for sign in',
	definition(t) {
		t.nonNull.string('email', {
			description: 'Email of the user',
		});
		t.nonNull.string('password', {
			description: 'Password of the user',
		});
		t.nullable.boolean('rememberMe', {
			description: 'Remember me option',
		});
	},
});
