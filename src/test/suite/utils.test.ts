import * as assert from 'assert';
import { getConfig } from '../../utils';

suite('Utils Test Suite', () => {
	test('getConfig', async () => {
		assert.rejects(() => getConfig(), new Error('rootPath not found'));
	});
});
