import {join} from 'path';
import {makeSchema} from 'nexus';

import * as types from './types';
import {LogPlugin} from '../plugins/log.plugin';
import {IS_DEV} from '../../env';

const typegen = IS_DEV
	? join(__dirname, '../../../generated/nexus-typegen.ts')
	: join(__dirname, '../../../generated/nexus-typegen.js');

const modulePath = IS_DEV
	? join(__dirname, 'main.context.ts')
	: join(__dirname, 'main.context.js');

const plugins = IS_DEV ? [LogPlugin] : [];

export const mainSchema = makeSchema({
	types,
	outputs: {
		schema: join(__dirname, '../../../generated/schema.graphql'),
		typegen,
	},
	contextType: {
		module: modulePath,
		export: 'MainContext',
	},
	plugins,
});
