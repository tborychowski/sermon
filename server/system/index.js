const Cpu = require('./cpu');
const Mem = require('./mem');
const Uptime = require('./uptime');
const Temp = require('./temp');
const Load = require('./load');
const Release = require('./release');
const Time = require('./time');
const Hostname = require('./hostname');
// const IP = require('./ip');


async function get () {
	const proms = [
		Cpu(),
		Mem(),
		Uptime(),
		Temp(),
		Load(),
		Release(),
		Time(),
		Hostname(),
		// IP(),
	];
	return Promise.all(proms).then(vals => {
		const [cpu, mem, uptime, temp, load, system, time, hostname] = vals;
		return { cpu, ...mem, temp, uptime, load, system, time, hostname };
	});
}


module.exports = get;
