import * as vscode from 'vscode';
import { TalismanScope, ITalisman } from '../../types';
import { talismanScopeList } from '../../constants';
import { isValidTalismanFile, configFileExists, getConfig, writeConfigFile } from '../../utils';

const addScopeConfig = async () => {
    if (!vscode.workspace.rootPath) {
        return vscode.window.showErrorMessage('Please open a folder first');
    }

    const pick: TalismanScope = (await vscode.window.showQuickPick(talismanScopeList)) as TalismanScope;

    if (pick) {
        let nextDoc: ITalisman;
        if (await configFileExists()) {
            const doc = await getConfig();
            if (isValidTalismanFile(doc)) {
                nextDoc = { ...doc };
                if (doc.scopeconfig && !doc.scopeconfig.find(({ scope }) => scope === pick)) {
                    nextDoc.scopeconfig = doc.scopeconfig.concat({ scope: pick });
                } else if (!doc.scopeconfig) {
                    nextDoc.scopeconfig = [{ scope: pick }];
                }
            } else {
                return vscode.window.showErrorMessage('Invalid file');
            }
        } else {
            nextDoc = {
                scopeconfig: [{ scope: pick }]
            };
        }
        
        await writeConfigFile(nextDoc);
        // Display a message box to the user
        vscode.window.showInformationMessage('Scope config added');
    }
};

export { addScopeConfig };
