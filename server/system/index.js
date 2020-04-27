const Cpu = require('./cpu');
const Mem = require('./mem');
const Uptime = require('./uptime');
const Load = require('./load');
const Temp = require('./temp');
const Release = require('./release');
const Time = require('./time');
const {readJsonFile, readDataFile} = require('../lib');
const getSystemConfig = () => readJsonFile('config.json').system || {};

async function getBuiltInData () {
	const proms = [
		Cpu(),
		Mem(),
		Uptime(),
		Load(),
		Temp(),
		Release(),
		Time(),
	];
	return Promise.all(proms).then(vals => {
		const [cpu, mem, uptime, load, temp, system, time] = vals;
		return { cpu, mem, uptime, load, temp, system, time };
	});
}

function getSourceValue (param) {
	return readDataFile(param.source).then(f => {
		f = f.trim();
		if (param.type === 'string') return f;
		if (param.type === 'number') return parseFloat(f);
	});
}


async function getData () {
	const builtIn = await getBuiltInData();
	const system = getSystemConfig();
	const defaults = {
		loadavg1: builtIn.load[0],
		loadavg5: builtIn.load[1],
		loadavg15: builtIn.load[2],
		temp: builtIn.temp,
	};

	for (let param of system) {
		if (defaults[param.source]) param.value = defaults[param.source];
		else if (param.source === 'meminfo') {
			param.value = builtIn.mem.used;
			param.max = builtIn.mem.total;
		}
		else param.value = await getSourceValue(param);
	}

	return system;
}


module.exports = getData;
