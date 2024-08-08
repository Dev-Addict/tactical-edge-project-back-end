import {inputObjectType} from 'nexus';

export const SignUpInput = inputObjectType({
	name: 'SignUpInput',
	description: 'Input type for sign up',
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
