import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { stub, mock, SinonMock, SinonSpy, SinonStub } from 'sinon';
import * as assert from 'assert';
import axios from 'axios';
import { before, beforeEach, afterEach, after } from 'mocha';
import install from '../../../commands/install';

suite('install', () => {
    let windowMock: SinonMock;
    let execSpy: SinonSpy;
    let execStub: SinonStub;
    let axiosStub: SinonStub;
    
    before(() => {
        execStub = stub(child_process, 'exec');
        axiosStub = stub(axios, 'get');
        axiosStub.callsFake(() => Promise.resolve({
            data: {
                pipe() {
                    return {
                        on(eventName: string, cb: Function) {
                            if (eventName === 'finish') {
                                cb();
                            }
                        }
                    };
                }
            }
        }));
    });

    beforeEach(() => {
        windowMock = mock(vscode.window);
    });

    afterEach(() => {
        windowMock.restore();
        execSpy && execSpy.resetHistory();
    });

    after(() => {
        execStub.restore();
        axiosStub.restore();
    });

    test('success', async () => {
        const stdout = 'ok';
        windowMock.expects('showInformationMessage').once().withArgs('Talisman installed successfully');
        execSpy = execStub.callsFake(function (cmd: string, cb: Function) {
            cb(null, stdout, null);
        } as typeof child_process.exec);

        assert.equal(await install(), stdout);

        assert(execSpy.calledOnce);
        windowMock.verify();
    });

    test('failure', async () => {
        const stderr = 'error';
        windowMock.expects('showErrorMessage').once().withArgs('Talisman installation failed');
        execSpy = execStub.callsFake(function (cmd: string, cb: Function) {
            cb(null, undefined, stderr);
        } as typeof child_process.exec);

        await assert.rejects(install, { message: stderr });

        assert(execSpy.calledOnce);
        windowMock.verify();
    });
});
