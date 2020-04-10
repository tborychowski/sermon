const {readFile} = require('../lib/util');
const os = require('os');
const path = require('path');

// const cpuinfo = '/proc/cpuinfo';
const cpuinfo = path.join(process.cwd(), 'proc/cpuinfo');

function parseInfo (info) {
	const lines = info.split(os.EOL);
	const cores = [];
	let i = 0;
	lines.forEach(l => {
		if (!l) return i += 1;
		let [name, value] = l.split(':');
		name = ('' + name).trim();
		value = ('' + value).trim();
		cores[i] = cores[i] || {};
		cores[i][name] = value;
	});
	const proc = {}, c = cores[0];
	proc.name = c['model name'] || c['model'];
	proc.cache = c['cache size'] || c['l2 cache'];
	proc.speed = (c['cpu MHz'] || c.clock).split('.')[0] + 'MHz';
	proc.cores = cores.length;
	return proc.name;
}

module.exports = () => readFile(cpuinfo).then(parseInfo);
