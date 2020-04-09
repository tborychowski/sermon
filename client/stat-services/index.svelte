<div class="panel">
	<div class="title">
		<h2>Services</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{#each data as service}
		<div>
			<em>{service.name}</em> {service.url}
			{#if service.running}
				<b>ON</b>
			{:else}
				<b>OFF</b>
			{/if}
			<br>
			<span>Ping: {service.duration}ms</span>
		</div>
		{/each}
	</div>
</div>

<script>
import {EVENT, get} from '../lib';
let data = [];

const refresh = async () => data = await get('services');


EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
