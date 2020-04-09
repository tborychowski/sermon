const {readFile, exists, run} = require('../lib/util');
const os = require('os');
const path = require('path');


function parseInfo (info) {
	const lines = info.split(os.EOL);
	const cores = [];
	let i = 0;
	lines.forEach(l => {
		if (!l) return i += 1;
		let [name, value] = l.split(':');
		name = ('' + name).trim();
		value = ('' + value).trim();
		cores[i] = cores[i] || {};
		cores[i][name] = value;
	});
	const proc = {}, c = cores[0];
	proc.name = c['model name'] || c['model'];
	proc.cache = c['cache size'] || c['l2 cache'];
	proc.speed = (c['cpu MHz'] || c.clock).split('.')[0] + 'MHz';
	proc.cores = cores.length;
	return proc;
}

function getCpuTemp () {
	const zoneTemp = '/sys/class/thermal/thermal_zone0/temp';
	if (!exists(zoneTemp)) return Promise.resolve(100);
	return readFile(zoneTemp).then(t => parseInt(t, 10) / 1000);
}

function getCpuInfo () {
	// const cpuinfo = '/proc/cpuinfo';
	const cpuinfo = path.join(process.cwd(), 'proc/cpuinfo');
	return readFile(cpuinfo).then(parseInfo);
}

function getUptime () {
	//12:42  up 8 days, 47 mins, 3 users, load averages: 1.69 1.81 1.87
	return run('/usr/bin/uptime').then(str => {
		// const time = str.substr(0, 5);
		str = str.trim();
		const up_usrs = str.substring(str.indexOf('up') + 3, str.indexOf(', load'));
		const uptime = up_usrs.split(', ').slice(0, -1).join(', ');
		const users = up_usrs.split(', ').pop();
		const load = str.split(' ').slice(-3);
		return {load, uptime, users};
	});
}


module.exports =  async () => {
	const cpuData = await getCpuInfo();
	const temp = await getCpuTemp();
	const upData = await getUptime();

	const cpu = cpuData.name;
	const {load, uptime, users} = upData;
	return {cpu, load, temp, uptime, users };
};
