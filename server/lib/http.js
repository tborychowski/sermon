const {http, https} = require('follow-redirects');

const TIMEOUT = 2000;
const ERROR_RESPONSE = { statusCode: 404, duration: 0 };

function request (url) {
	return new Promise(resolve => {
		const start = new Date();
		const isHttps = url.protocol === 'https:';
		const fn = isHttps ? https : http;
		const port = url.port || (isHttps ? 443 : 80);
		const hostname = url.hostname;

		const req = fn.request({ hostname, port, path: url.pathname, method: 'GET', timeout: TIMEOUT }, res => {
			res.duration = (new Date()) - start;
			resolve(res);
		});
		req.on('timeout', () => {
			req.abort();
			resolve(ERROR_RESPONSE);
		});
		req.on('error', () => resolve(ERROR_RESPONSE));
		req.end();
	});
}


module.exports = request;
