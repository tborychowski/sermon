// const axios = require('axios');
const net = require('net');
const {getUrl} = require('./utils');
const TIMEOUT = 2000;
const ERROR_RESPONSE = { status: 404, statusText: 'Not found', duration: 0 };

// timeout is not enforced. try node-fetch or similar
// function request (url) {
// 	let timeout;
// 	return new Promise(resolve => {
// 		const start = new Date();
// 		axios(url, { timeout: TIMEOUT })
// 			.then(res => {
// 				console.log(1);
// 				if (timeout) clearTimeout(timeout);
// 				res.duration = (new Date()) - start;
// 				resolve(res);
// 			})
// 			.catch(e => {
// 				if (timeout) clearTimeout(timeout);
// 				e.response = e.response || {};
// 				e.response.duration = (new Date()) - start;
// 				resolve(e.response);
// 			});
// 		// enforce timeout
// 		timeout = setTimeout(() => {
// 			resolve(ERROR_RESPONSE);
// 		}, TIMEOUT);
// 	});
// }


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



module.exports = {
	// request,
	tcp,
};
