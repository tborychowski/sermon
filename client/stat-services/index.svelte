<div class="panel">
	<div class="title">
		<h2>Services</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{#each data as service}
			<ServiceBox bind:service="{service}"/>
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
	refresh();
});

function mergeData (res) {
	const _data = [];
	res.forEach(item => {
		const oldItem = data.find(i => i.url === item.url);
		_data.push(Object.assign({}, oldItem, item));
	});
	data = _data;
}

function refresh () {
	get('services').then(mergeData);
	EVENT.fire(EVENT.refresh.services);
}

</script>
