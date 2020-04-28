import {writable} from 'svelte/store';
import {EVENT, get} from '../lib';


export const system = writable([]);
export const disks = writable([]);
export const services = writable([]);
export const meta = writable({});

function refresh () {
	EVENT.fire(EVENT.refresh.before);
	get('data').then(res => {
		if (res.system) system.set(res.system);
		if (res.disks) disks.set(res.disks);
		if (res.services) services.set(res.services);
		if (res.meta) meta.set(res.meta);
		EVENT.fire(EVENT.refresh.after);
	});
}

EVENT.on(EVENT.refresh.all, refresh);
setInterval(refresh, 3000);
refresh();
