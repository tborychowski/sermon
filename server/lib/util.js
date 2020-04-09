const { exec } = require('child_process');
const fs = require('fs-extra');

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

const readFile = name => fs.readFile(name, 'utf8');
const exists = name => fs.existsSync(name);

function formatBytes (bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = {
	isDev,
	isTest,
	isProd,
	run,
	readFile,
	exists,
	formatBytes,
};
