 <div class="service-box">
	<h3><a href="{service.url}" target="_blank">{service.name}</a></h3>
	<div class="flex-spacer"></div>
	<!-- <div class="ping">
		{#if service.status === 'online'}
			{service.duration || 0}ms
		{/if}
	</div> -->
	<div class="service-status {service.status || ''}" class:loading="{loading}">
		{service.status || 'calling'}
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
