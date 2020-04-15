const { readJsonFile } = require('../lib');

// this doesn't work in docker bridge mode?
// /proc/sys/kernel/hostname
// module.exports = () => readDataFile('hostname').then(hn => hn.trim());

module.exports = () => {
	const {hostname, hostip } = readJsonFile('config.json');
	return { hostname, hostip };
};
