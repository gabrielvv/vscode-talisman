import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { addScopeConfig } from '../../../commands/scopeconfig';

suite('addScopeConfig', () => {
	test('error if there isn\'t an open folder', async () => {
        const mock = sinon.mock(vscode.window);
        mock.expects('showErrorMessage').once().withArgs('Please open a folder first');
        
        await addScopeConfig();

        mock.verify();
        mock.restore();
	});
});
