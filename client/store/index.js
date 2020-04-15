import {writable} from 'svelte/store';
import {EVENT, get} from '../lib';


export const system = writable({ load: [] });
export const services = writable([]);

function refresh () {
	EVENT.fire(EVENT.refresh.before);
	get('data').then(res => {
		if (res.system) system.set(res.system);
		if (res.services) services.set(res.services);
		EVENT.fire(EVENT.refresh.after);
	});
}

EVENT.on(EVENT.refresh.all, refresh);
refresh();
