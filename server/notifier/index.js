const {writeJsonFile, readJsonFile, compareJson} = require('../lib');
const slack = require('./slack');

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


function notifier (data) {
	const systemFailures = checkSystem(data.system);
	const diskFailures = checkDisks(data.disks);
	const servicesFailures = checkServices(data.services);

	const state = JSON.stringify([...systemFailures, ...diskFailures, ...servicesFailures]);
	const oldState = readJsonFile('system-state.json');
	const same = compareJson(state, oldState);
	if (!same) {
		slack(systemFailures, servicesFailures);
		writeJsonFile('system-state.json', state);
	}
}

module.exports = notifier;
