const { readFile } = require('../lib/util');
const { EOL } = require('os');
const path = require('path');

// const fname = '/etc/os-release';
const fname = path.join(process.cwd(), 'proc/os-release');


function parseInfo (str) {
	const res = {};
	str
		.split(EOL)
		.map(l => (l.trim(), l))
		.filter(l => !!l)
		.forEach(l => {
			const [name, value] = l.split('=');
			res[name.toLowerCase()] = value.replace(/"/g, '');
		});
	return res.name + ' ' + res.version;
}


module.exports = () => readFile(fname).then(parseInfo);
