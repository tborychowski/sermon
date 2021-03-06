const { EOL, run, formatBytes, readDataFile, readJsonFile, isDev } = require('../lib');

const ignoreFs = ['tmpfs', 'overlay', 'shm'];

// Filesystem           1024-blocks    Used Available Capacity Mounted on
function parseLine (line) {
	const [filesystem, , usd, fr, capacity, mnt] = line.split(/\s+/);
	const percent = parseFloat(capacity);
	let free = parseFloat(fr) * 1024;
	let used = parseFloat(usd) * 1024;
	const total = formatBytes(free + used);
	free = formatBytes(free);
	used = formatBytes(used);
	return {filesystem, used, free, total, percent, mnt};
}

function parse (data) {
	const lines = data.split(EOL).slice(1);
	const disks = [];
	for (const l of lines) {
		if (!l.trim()) continue;
		disks.push(parseLine(l));
	}
	return disks.filter(d => !ignoreFs.includes(d.filesystem));
}

function filter (disks) {
	const configDisks = readJsonFile('config.json').disks || [];
	configDisks.forEach(configDisk => {
		const disk = disks.find(d => d.mnt === configDisk.mnt);
		if (disk) Object.assign(configDisk, disk);
	});
	return configDisks;
}

module.exports = () => {
	if (isDev) return readDataFile('df').then(parse).then(filter);
	return run('/bin/df -P').then(parse).then(filter);
};
