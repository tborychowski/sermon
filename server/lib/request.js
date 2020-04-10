const axios = require('axios');
const net = require('net');
const TIMEOUT = 2000;
const ERROR_RESPONSE = { status: 404, statusText: 'Not found', duration: 0 };

function request (url) {
	return new Promise(resolve => {
		const start = new Date();
		axios(url)
			.then(res => {
				res.duration = (new Date()) - start;
				resolve(res);
			})
			.catch(e => {
				e.response = e.response || {};
				e.response.duration = (new Date()) - start;
				resolve(e.response);
			});
		// enforce timeout
		setTimeout(() => {
			resolve(ERROR_RESPONSE);
		}, TIMEOUT);
	});
}


function tcp (url) {
	const [ip, port] = url.split(':');
	const client = new net.Socket();
	client.setTimeout(TIMEOUT);

	return new Promise(resolve => {
		const start = new Date();
		client.connect(port || 80, ip, () => {
			const duration = (new Date()) - start;
			resolve({ status: 200, statusText: 'OK', duration });
		});
		client.on('data', () => client.destroy());
		client.on('timeout', () => { resolve(ERROR_RESPONSE); client.destroy(); });
		client.on('error', () => { resolve(ERROR_RESPONSE); client.destroy(); });
	});
}



module.exports = {
	request,
	tcp,
};
