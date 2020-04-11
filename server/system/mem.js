const {EOL, readDataFile} = require('../lib');


function parseInfo (info) {
	const lines = info.split(EOL);
	const data = {};
	lines.forEach(l => {
		if (!l) return;
		let [name, val] = l.split(':');
		name = ('' + name).trim();
		val = ('' + val).trim();
		let [value, unit] = val.split(' ');
		if (unit === 'kB') value *= 1024;
		data[name] = {value: value || '', unit: unit || ''};

	});
	const memfree = parseFloat(data.MemFree.value);
	const buffers = parseFloat(data.Buffers.value);
	const cached = parseFloat(data.Cached.value);

	const memFree = memfree + buffers + cached;
	const memTotal = data.MemTotal.value || 0;
	const memUsed = memTotal - memFree;
	// const memPercent = 100 - (Math.round(memFree / memTotal * 100));
	return {
		memUsed: memUsed / 1000000000,
		memTotal: memTotal / 1000000000,
		// memFree: formatBytes(memFree, 1),
		// memPercent,
	};
}

module.exports =  () => readDataFile('meminfo').then(parseInfo);
