// curl --silent  https://raw.githubusercontent.com/thoughtworks/talisman/master/global_install_scripts/install.bash > /tmp/install_talisman.bash && /bin/bash /tmp/install_talisman.bash
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as fs from 'fs';
import axios from 'axios';

const installScriptUrl = 'https://raw.githubusercontent.com/thoughtworks/talisman/master/global_install_scripts/install.bash';
const tmpScriptLocation = '/tmp/install_talisman.bash';

// TODO progress indicator
// TODO detect Talisman installation
const install = async () => {
    await axios.get(installScriptUrl).then(({ data }) => {
        const writable = data.pipe(fs.createWriteStream(tmpScriptLocation));
        return new Promise((resolve, reject) => {
            writable.on('finish', resolve);
            writable.on('error', reject);
        });
    });

    return new Promise((resolve, reject) => {
        child_process.exec(installScriptUrl, (error, stdout, stderr) => {
            if (error || stderr) {
                vscode.window.showErrorMessage('Talisman installation failed');
                reject({
                    message: error ? error.message : stderr
                });
            }
            vscode.window.showInformationMessage('Talisman installed successfully');
            return resolve(stdout);
        });
    });
};

export default install;
