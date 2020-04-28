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
		value = value || 0;
		unit = unit || '';
		if (unit === 'kB') value *= 1024;
		data[name] = {value, unit};

	});
	const memfree = parseFloat(data.MemFree.value);
	const buffers = parseFloat(data.Buffers.value);
	const cached = parseFloat(data.Cached.value);

	const memFree = memfree + buffers + cached;
	const memTotal = data.MemTotal.value || 0;
	const memUsed = memTotal - memFree;
	// const memPercent = 100 - (Math.round(memFree / memTotal * 100));
	return {
		used: memUsed / 1000000000,
		total: memTotal / 1000000000,
		free: memFree / 1000000000,
	};
}

module.exports =  () => readDataFile('proc/meminfo').then(parseInfo);
