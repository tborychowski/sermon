const _cache = {};

function fire (topic, ...args) {
	if (!_cache[topic]) return;
	_cache[topic].forEach(cb => {
		if (typeof cb === 'function') cb.apply(cb, args);
	});
}

function on (topic, callback) {
	if (!_cache[topic]) _cache[topic] = [];
	_cache[topic].push(callback);
	return [topic, callback];       // handle for off
}

function off (handle) {
	const [topic, cb] = handle;
	const cbstr = cb.toString();
	const ca = _cache[topic];
	if (ca) {
		ca.forEach((fn, i) => {
			if (fn.toString() === cbstr) ca.splice(i, 1);
		});
	}
}


export {
	on,
	off,
	fire
};
