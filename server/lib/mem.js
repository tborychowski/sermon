const {readFile} = require('./util');
const {EOL} = require('os');
const path = require('path');
const {formatBytes} = require('./util');

// const meminfo = '/proc/meminfo';
const meminfo = path.join(process.cwd(), 'proc/meminfo');


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

	const free = memfree + buffers + cached;
	const total = data.MemTotal.value || 0;
	const used = total - free;
	const percent = 100 - (Math.round(free / total * 100));
	return {
		free: formatBytes(free, 1),
		total: formatBytes(total, 1),
		used: formatBytes(used, 1),
		percent,
	};
}


module.exports =  () => readFile(meminfo).then(parseInfo);
