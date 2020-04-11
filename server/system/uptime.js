const { timeAgo, readDataFile } = require('../lib');


function parseInfo (info) {
	const sec = info.split(' ').shift();
	return timeAgo(sec);
}


module.exports = () => readDataFile('uptime').then(parseInfo);
