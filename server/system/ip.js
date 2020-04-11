const { EOL, run } = require('../lib');

// Name:      host.docker.internal
// Address 1: 192.168.65.2
function parseInfo (info) {
	const line = info.trim().split(EOL).pop();
	return line.split(':').pop().trim();
}


module.exports = () => run('nslookup host.docker.internal')
	.then(parseInfo)
	.catch(() => {});
