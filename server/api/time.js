const { run } = require('../lib');


function parseInfo (info) {
	const time = info.split(' ').slice(-2, -1);
	return time;
}


module.exports = () => run('/bin/date').then(parseInfo);
