const net = require('net');
const {getUrl} = require('./utils');

const TIMEOUT = 2000;
const ERROR_RESPONSE = { status: 404, statusText: 'Not found', duration: 0 };


function tcp (url) {
	const _url = getUrl(url);
	let port = _url.port || (_url.protocol === 'https:' ? 443 : 80);

	const client = new net.Socket();
	client.setTimeout(TIMEOUT);
	return new Promise(resolve => {
		const start = new Date();
		client.connect(port, _url.hostname, () => {
			const duration = (new Date()) - start;
			client.destroy();
			resolve({ status: 200, statusText: 'OK', duration });
		});
		client.on('data', () => client.destroy());
		client.on('timeout', () => { client.destroy(); resolve(ERROR_RESPONSE); });
		client.on('error', () => { client.destroy(); resolve(ERROR_RESPONSE); });
	});
}



module.exports = tcp;
