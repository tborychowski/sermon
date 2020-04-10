<div class="panel">
	<div class="title">
		<h2>Services</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{#each data as service}
			<ServiceBox service="{service}"/>
		{/each}
	</div>
</div>

<script>
import {onMount} from 'svelte';
import ServiceBox from '../service-box';
import {EVENT, get} from '../lib';
let data = [];


onMount(() => {
	EVENT.on(EVENT.refresh.all, refresh);
	get('services').then(res => data = Object.assign([], data, res));
	refresh();
});


function refresh () {
	EVENT.fire(EVENT.refresh.services);
}



</script>
