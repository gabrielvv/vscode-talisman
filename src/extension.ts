import * as vscode from 'vscode';
import { addScopeConfig, removeScopeConfig } from './commands/scopeconfig';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('talisman.addScopeConfig', addScopeConfig));
	context.subscriptions.push(vscode.commands.registerCommand('talisman.removeScopeConfig', removeScopeConfig));
}

// this method is called when your extension is deactivated
export function deactivate() { }
