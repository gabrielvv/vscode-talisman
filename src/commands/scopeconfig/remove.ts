
import * as vscode from 'vscode';
import { TalismanScope, ITalisman } from '../../types';
import { isValidTalismanFile, configFileExists, getConfig, writeConfigFile } from '../../utils';

const removeScopeConfig = () => vscode.commands.registerCommand('talisman.removeScopeConfig', async () => {
    if (!vscode.workspace.rootPath) {
        return vscode.window.showErrorMessage('Please open a folder first');
    }
    
    
    let nextDoc: ITalisman;
    if (await configFileExists()) {
        const doc = await getConfig();
        if (isValidTalismanFile(doc)) {
            const currentScopeList = doc.scopeconfig;
            if (!currentScopeList || currentScopeList.length === 0) {
                return vscode.window.showInformationMessage('There are no scope config to remove');
            }

            const pick: TalismanScope = (
                await vscode.window.showQuickPick(
                    currentScopeList.map(({ scope }) => scope)
                )
            ) as TalismanScope;

            const nextScopeConfig = currentScopeList.filter(({ scope }) => scope !== pick);
            nextDoc = {
                ...doc,
                scopeconfig: nextScopeConfig
            };
            if (!nextScopeConfig.length) {
                delete nextDoc.scopeconfig;
            }
        } else {
            return vscode.window.showErrorMessage('Invalid file');
        }
    } else {
        return vscode.window.showErrorMessage('File not found');
    }
    
    await writeConfigFile(nextDoc);
    // Display a message box to the user
    vscode.window.showInformationMessage('Scope config removed');
});

export { removeScopeConfig };