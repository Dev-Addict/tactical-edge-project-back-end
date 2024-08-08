import {objectType} from 'nexus';

export const User = objectType({
	name: 'User',
	description: 'User model',
	definition(t) {
		t.id('id', {
			description: 'User ID',
		});
		t.nonNull.string('email', {
			description: 'User email',
		});
		t.nonNull.boolean('visible', {
			description: 'User visibility',
		});
	},
});
