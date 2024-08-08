import {inputObjectType} from 'nexus';

export const IsEmailTakenInput = inputObjectType({
	name: 'IsEmailTakenInput',
	description: 'The input type for the isEmailTaken query.',
	definition(t) {
		t.nonNull.string('email', {
			description: 'The email to check.',
		});
	},
});
