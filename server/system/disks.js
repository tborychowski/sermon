const { EOL, run, formatBytes, readDataFile, readJsonFile, isDev } = require('../lib');

const ignoreFs = ['tmpfs', 'overlay', 'shm'];

// Filesystem           1024-blocks    Used Available Capacity Mounted on
function parseLine (line) {
	let [filesystem, , used, free, capacity, mnt] = line.split(/\s+/);
	capacity = parseFloat(capacity);
	free = parseFloat(free) * 1024;
	used = parseFloat(used) * 1024;
	const total = formatBytes(free + used);
	free = formatBytes(free);
	used = formatBytes(used);
	return {filesystem, used, free, total, capacity, mnt};
}

function parse (data) {
	const lines = data.split(EOL).slice(1);
	const disks = [];
	for (let l of lines) {
		if (!l.trim()) continue;
		disks.push(parseLine(l));
	}
	return disks.filter(d => !ignoreFs.includes(d.filesystem));
}

function filter (disks) {
	const configDisks = readJsonFile('config.json').disks;
	configDisks.forEach(configDisk => {
		const disk = disks.find(d => d.mnt === configDisk.mnt);
		if (disk) Object.assign(configDisk, disk);
	});
	return configDisks;
}

module.exports = () => {
	if (isDev) return readDataFile('df').then(parse).then(filter);
	else run('df -P').then(parse).then(filter);
};
