const path = require('path');
const {writeJsonFile, readJsonFile, compareJson, exists} = require('../lib');
const slack = require('./slack');
const stateFile = 'system-state.json';

function checkSystem (data) {
	return data
		.map(item => {
			if (item.value > item.warning) {
				let name = item.name;
				if (item.source.includes('loadavg')) name = 'CPU load';
				const above = (item.value > item.alert ? item.alert : item.warning) + item.unit;
				return `${name} above ${above}`;
			}
		})
		.filter(item => !!item);
}

function checkDisks (disks) {
	const failures = [];
	disks.forEach(disk => {
		if (disk.percent > 80) failures.push(`Free space on disk *${disk.name}* is low.`);
	});
	return failures;
}

function checkServices (services) {
	return services
		.filter(s => s.status === 'offline')
		.map(s => `*${s.name}* is down`);
}


function notifier (data, isInitial) {
	const systemFailures = checkSystem(data.system);
	const diskFailures = checkDisks(data.disks);
	const servicesFailures = checkServices(data.services);
	const state = JSON.stringify([...systemFailures, ...diskFailures, ...servicesFailures]);
	const failures = [...systemFailures, ...servicesFailures].join('\n');

	const stateExists =  exists(path.join(process.cwd(), 'data', stateFile));

	if (stateExists) {
		if (isInitial) slack('Application has been restarted', 'warning');

		const oldState = readJsonFile(stateFile);
		const same = compareJson(state, oldState);
		if (!same) slack(failures.length ? failures : 'Everything is fine');
	}
	writeJsonFile(stateFile, state);
}

module.exports = notifier;
