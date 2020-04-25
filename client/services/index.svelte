<div class="panel services-panel">
	<div class="content">
		<header class:expanded="{expanded}"
			on:click="{() => expanded = !expanded}">
			<h1>Services</h1>
			<Summary/>
		</header>
		<div class="services-list" class:expanded="{expanded}">
			{#each $services as service}
				<ServiceBox service="{service}"/>
			{/each}
		</div>
	</div>
</div>

<script>
import ServiceBox from './service-box';
import Summary from './summary';
import {services} from '../store';

let expanded = false;
</script>
