const {https} = require('follow-redirects');

function post (url, data) {
	return new Promise((resolve, reject) => {
		const {hostname, protocol, pathname} = new URL(url);
		const options = {method: 'POST', hostname, path: pathname, protocol, port: 443};
		const req = https.request(options);
		req.on('data', res => resolve(res));
		req.on('error', e => reject(e));
		req.write(JSON.stringify(data));
		req.end();
	});
}

module.exports = post;
