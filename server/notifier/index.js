const {writeJsonFile, readJsonFile, compareJson} = require('../lib');
const slack = require('./slack');

function checkSystem (data) {
	const failures = [];
	if (data.load[1] > 60) failures.push('- CPU load is above 60% for more than 5 minutes');
	if (data.temp > 60) failures.push('- System temperature is above 60°C');
	data.disks.forEach(disk => {
		if (disk.capacity > 80) failures.push(`- Free space on disk *${disk.name}* is low.`);
	});
	return failures;
}

function checkServices (services) {
	return services
		.filter(s => s.status === 'offline')
		.map(s => `- *${s.name}* is down`);
}


function notifier (data) {
	const systemFailures = checkSystem(data.system);
	const servicesFailures = checkServices(data.services);

	const state = JSON.stringify([...systemFailures, ...servicesFailures]);
	const oldState = readJsonFile('system-state.json');
	const same = compareJson(state, oldState);
	if (!same) {
		slack(systemFailures, servicesFailures);
		writeJsonFile('system-state.json', state);
	}
}

module.exports = notifier;
