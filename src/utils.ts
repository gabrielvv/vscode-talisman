import { ITalisman } from "./types";
import * as fse from 'fs-extra';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { talismanFile } from "./constants";
import * as vscode from 'vscode';

const isValidTalismanFile = (doc: string | object | undefined): doc is ITalisman => {
	if (typeof doc === 'string') {
		return false;
	}
	return true;
};

const getConfigFilePath = () => {
	if (!vscode.workspace.rootPath) {
		throw new Error('rootPath not found');
	}
	return path.join(vscode.workspace.rootPath, talismanFile);
};

const configFileExists = async () =>  await fse.pathExists(getConfigFilePath());

const getConfig = async () => {
	const filePath = getConfigFilePath();
	const fileContent = await fse.readFile(filePath);
	const doc = yaml.safeLoad((fileContent).toString());
	return doc || {};
};

const emptyFileIfDocIsEmpty = (doc: ITalisman) => Object.keys(doc).length ? yaml.safeDump(doc) : '';

const writeConfigFile = async (nextDoc: ITalisman) => await fse.writeFile(getConfigFilePath(), emptyFileIfDocIsEmpty(nextDoc));

export {
	isValidTalismanFile,
	emptyFileIfDocIsEmpty,
	configFileExists,
	getConfig,
	writeConfigFile
};