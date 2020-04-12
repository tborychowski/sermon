const { run } = require('../lib');


function parseInfo (info) {
	const time = info.split(' ').slice(4, 1)[0];
	return time;
}


module.exports = () => run('/bin/date').then(parseInfo);
