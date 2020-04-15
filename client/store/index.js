import {writable} from 'svelte/store';
import {EVENT, get, dateFormat} from '../lib';


export const system = writable({ load: [] });
export const services = writable([]);
export const updatedAt = writable(dateFormat());

function refresh () {
	EVENT.fire(EVENT.refresh.before);
	get('data').then(res => {
		if (res.system) system.set(res.system);
		if (res.services) services.set(res.services);
		if (res.updatedAt) updatedAt.set(dateFormat(res.updatedAt));
		EVENT.fire(EVENT.refresh.after);
	});
}

EVENT.on(EVENT.refresh.all, refresh);
refresh();
