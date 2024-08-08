import {inputObjectType} from 'nexus';

export const UpdateSelfInput = inputObjectType({
	name: 'UpdateSelfInput',
	description: 'Input of the updateSelf mutation',
	definition(t) {
		t.nullable.boolean('visible', {
			description: 'Visibility of the user',
		});
	},
});
