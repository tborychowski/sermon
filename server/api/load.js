const { readFile } = require('../lib/util');
const path = require('path');

// const loadAvg = '/proc/loadavg';
const loadAvg = path.join(process.cwd(), 'proc/loadavg');


function parseInfo (info) {
	return info.split(' ').slice(0, 3);
}


module.exports = () => readFile(loadAvg).then(parseInfo);
