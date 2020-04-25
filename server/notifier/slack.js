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
	if (systemFailures.length) {
		attachments.push(makeBlock('error', '*System*', systemFailures.join('\n')));
	}
	else {
		attachments.push(makeBlock('success', '*System*', 'Everything is fine'));
	}

	if (servicesFailures.length) {
		attachments.push(makeBlock('error', '*Services*', servicesFailures.join('\n')));
	}
	else {
		attachments.push(makeBlock('success', '*Services*', 'All services are up'));
	}

	if (!isDev) post(config.notifications.slack, {attachments});
}

module.exports = notify;
