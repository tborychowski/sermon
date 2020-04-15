const axios = require('axios');

const TIMEOUT = 2000;
const ERROR_RESPONSE = { status: 404, statusText: 'Not found', duration: 0 };

// timeout is not enforced. try node-fetch or similar
function request (url) {
	let timeout;
	return new Promise(resolve => {
		const start = new Date();
		axios(url, { timeout: TIMEOUT })
			.then(res => {
				console.log(1);
				if (timeout) clearTimeout(timeout);
				res.duration = (new Date()) - start;
				resolve(res);
			})
			.catch(e => {
				if (timeout) clearTimeout(timeout);
				e.response = e.response || {};
				e.response.duration = (new Date()) - start;
				resolve(e.response);
			});
		// enforce timeout - this sometimes hangs
		timeout = setTimeout(() => {
			resolve(ERROR_RESPONSE);
		}, TIMEOUT);
	});
}


module.exports = request;
