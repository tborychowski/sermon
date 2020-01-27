const { exec } = require('child_process');

const env = process.env.NODE_ENV || 'dev';

const isTest = env === 'test';
const isDev = (env === 'development' || env === 'dev');
const isProd = (env === 'production' || env === 'prod');



function run (cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) return reject(error);
			if (stderr) return reject(stderr);
			resolve(stdout);
		});
	});
}


module.exports = {
	isDev,
	isTest,
	isProd,
	run,
};
