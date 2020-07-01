const {isDev, logger, readJsonFile, post} = require('../lib');
const config = readJsonFile('config.json');

const APP_TITLE = '*Server*';
const COLORS = {
	error: '#8b4848',
	warning: '#af8a1a',
	success: '#408062'
};

const makeBlock = (text, type) => ({ color: COLORS[type], pretext: APP_TITLE, text});

function log (msg, type) {
	if (type === 'success' || type === 'debug') type = 'info';
	else if (type === 'warning') type = 'warn';
	logger[type](msg);
}

function notify (msg, type = 'success') {
	const attachments = [ makeBlock(msg, type) ];
	if (isDev) log(msg, type);
	else if (config.notifications) {
		post(config.notifications.slack, { attachments });
	}
}

module.exports = notify;
