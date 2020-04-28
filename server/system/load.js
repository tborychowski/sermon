const { readDataFile } = require('../lib');


function parseInfo (info) {
	return info.split(' ').slice(0, 3).map(n => parseFloat(n));
}


module.exports = () => readDataFile('proc/loadavg').then(parseInfo);
