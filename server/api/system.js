const {EOL} = require('os');
const {run} = require('../lib/util');
const s = `NAME="Ubuntu"
VERSION="19.10 (Eoan Ermine)"`;


function parseInfo (str = s) {
	const res = {};
	str.split(EOL).forEach(l => {
		const [name, value] = l.split('=');
		if (name.includes('_URL')) return;
		res[name.toLowerCase()] = value.replace(/"/g, '');
	});
	return res.name + ' ' + res.version;
}

module.exports =  async () => {
	return run('cat /etc/*release')
		.then(parseInfo)
		.catch(() => parseInfo());
};
