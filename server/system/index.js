const Cpu = require('./cpu');
const Mem = require('./mem');
const Uptime = require('./uptime');
const Temp = require('./temp');
const Load = require('./load');
const Release = require('./release');
const Time = require('./time');
const Host = require('./host');


async function get () {
	const proms = [
		Cpu(),
		Mem(),
		Uptime(),
		Temp(),
		Load(),
		Release(),
		Time(),
		Host(),
	];
	return Promise.all(proms).then(vals => {
		const [cpu, mem, uptime, temp, load, system, time, host] = vals;
		return { cpu, ...mem, temp, uptime, load, system, time, ...host };
	});
}


module.exports = get;
