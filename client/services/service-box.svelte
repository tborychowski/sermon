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
import {EVENT} from '../lib';
export let service = { status: 'loading' };
let loading = false;

onMount(() => {
	EVENT.on(EVENT.refresh.before, () => (loading = true));
	EVENT.on(EVENT.refresh.after, () => (loading = false));
});

</script>
