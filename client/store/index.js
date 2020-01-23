import {writable} from 'svelte/store';

function get (url) {
	const opts = { method: 'GET', headers: { 'Content-type': 'application/json' }};
	return fetch(`api/${url}`, opts).then(res => res.json());
}


function procStore () {
	const { subscribe, set } = writable(0);
	return {
		subscribe,
		reload: () => get('proc').then(set),
	};
}


function memStore () {
	const { subscribe, set } = writable(0);
	return {
		subscribe,
		reload: () => get('mem').then(set),
	};
}

export const proc = procStore();
export const mem = memStore();
