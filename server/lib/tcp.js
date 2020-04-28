const net = require('net');

const TIMEOUT = 5000;
const ERROR_RESPONSE = { statusCode: 404, duration: 0 };


function tcp (url) {
	const port = url.port || (url.protocol === 'https:' ? 443 : 80);

	const client = new net.Socket();
	client.setTimeout(TIMEOUT);

	return new Promise(resolve => {
		const start = new Date();
		client.connect(port, url.hostname, () => {
			const duration = (new Date()) - start;
			client.destroy();
			resolve({ statusCode: 200, duration });
		});
		client.on('data', () => client.destroy());
		client.on('timeout', () => { client.destroy(); resolve(ERROR_RESPONSE); });
		client.on('error', () => { client.destroy(); resolve(ERROR_RESPONSE); });
	});
}



module.exports = tcp;
