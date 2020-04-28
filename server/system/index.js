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
		const loadavg1 = load[0];
		const loadavg5 = load[1];
		const loadavg15 = load[2];
		return { cpu, mem, uptime, loadavg1, loadavg5, loadavg15, temp, system, time };
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
	for (const param of system) {
		if (builtIn[param.source]) param.value = builtIn[param.source];
		else if (param.source === 'meminfo') {
			param.value = builtIn.mem.used;
			param.max = builtIn.mem.total;
		}
		else param.value = await getSourceValue(param);
	}
	return system;
}


module.exports = getData;
