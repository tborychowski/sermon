<div class="panel panel-services">

	<header class:expanded="{expanded}"
		on:click="{() => expanded = !expanded}">
		<h1>Services</h1>
		<Summary/>
	</header>

	{#if expanded}
		<div class="services-list" transition:slide>
			{#each $services as service}
				<ServiceBox service="{service}"/>
			{/each}
		</div>
	{/if}

</div>

<script>
import {slide} from 'svelte/transition';
import ServiceBox from './service-box';
import Summary from './summary';
import {services} from '../store';

let expanded = false;
</script>
