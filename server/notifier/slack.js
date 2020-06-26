const {isDev, readJsonFile, post} = require('../lib');
const config = readJsonFile('config.json');

const COLORS = {
	error: '#8b4848',
	warning: '#af8a1a',
	success: '#408062'
};

function makeBlock (type, title, text) {
	return { color: COLORS[type], pretext: title, text};
}

function notify (systemFailures, servicesFailures) {
	const attachments = [];
	const failures = [...systemFailures, ...servicesFailures];
	if (failures.length) {
		attachments.push(makeBlock('error', '*Server*', failures.join('\n')));
	}
	else {
		attachments.push(makeBlock('success', '*Server*', 'Everything is fine'));
	}

	if (!isDev) post(config.notifications.slack, {attachments});
}

module.exports = notify;
