const { readFile, timeAgo } = require('../lib/util');
const path = require('path');

const uptimeinfo = path.join(process.cwd(), 'proc/uptime');


function parseInfo (info) {
	const sec = info.split(' ').shift();
	return timeAgo(sec);
}


module.exports = () => readFile(uptimeinfo).then(parseInfo);
