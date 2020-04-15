<div class="panel">
	<div class="content">
		{#each $services as service}
			<ServiceBox service="{service}"/>
		{/each}
	</div>
</div>

<script>
import ServiceBox from './service-box';
import {services} from '../store';
</script>
