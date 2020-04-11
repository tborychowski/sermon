const { readDataFile } = require('../lib');


function parseInfo (info) {
	return info.split(' ').slice(0, 3);
}


module.exports = () => readDataFile('loadavg').then(parseInfo);
