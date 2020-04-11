const { EOL, readDataFile } = require('../lib');


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

// /etc/os-release
module.exports = () => readDataFile('os-release').then(parseInfo);
