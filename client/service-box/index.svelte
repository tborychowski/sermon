 <div class="service-box">
	<div class="service-box-left">
		<h3>{service.name}</h3>
		<a class="service-url" href="{service.url}" target="_blank">{service.url}</a>
	</div>
	<div class="service-box-right">
		<div class="service-status {service.status || ''}" class:loading="{loading}">
			{service.status || 'calling'}
		</div>
		<div class="ping">
			{#if service.status === 'online'}
				Ping: {service.duration || 0}ms
			{/if}
		</div>
	</div>
</div>

<script>
import {onMount} from 'svelte';
import {EVENT, get} from '../lib';
export let service = { status: 'loading' };
let loading = false;

onMount(() => {
	EVENT.on(EVENT.refresh.all, refresh);
	EVENT.on(EVENT.refresh.services, refresh);
	refresh();
});


function refresh () {
	loading = true;
	get('services/' + encodeURIComponent(service.url))
		.then(res => {
			service = Object.assign({}, service, res);
			if (service.running === true) service.status = 'online';
			else if (service.running === false) service.status = 'offline';
			else service.status = 'calling';
			loading = false;
		});
}

</script>
