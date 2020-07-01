import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { removeScopeConfig } from '../../../commands/scopeconfig';

suite('removeScopeConfig Test Suite', () => {
	test('error if there isn\'t an open folder', async () => {
        const mock = sinon.mock(vscode.window);
        mock.expects('showErrorMessage').once().withArgs('Please open a folder first');
        
        await removeScopeConfig();

        mock.verify();
        mock.restore();
	});
});