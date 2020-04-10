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


function timeAgo (seconds) {
	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 0 }
	];
	const chunks = [];
	while (seconds) {
		const interval = intervals.find(i => i.seconds < seconds);
		const count = Math.floor(seconds / (interval.seconds || seconds));
		chunks.push(`${count} ${interval.label}${count !== 1 ? 's' : ''}`);
		seconds -= count * (interval.seconds || seconds);
	}
	return chunks.slice(0, -1).join(', ') + ' and ' + chunks.slice(-1)[0];
}


module.exports = {
	isDev,
	isTest,
	isProd,
	run,
	readFile,
	exists,
	formatBytes,
	timeAgo,
};
