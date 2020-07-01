type TalismanScope = 'node' | 'go';
interface ITalisman {
	scopeconfig?: Array<{
		scope: TalismanScope
	}>
	fileignoreconfig?: Array<{
		filename: string;
		checksum: string;
		ignore_detectors: string[]
	}>
}

export {
    TalismanScope,
    ITalisman
};