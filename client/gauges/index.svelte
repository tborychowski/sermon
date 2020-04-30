<div class="panel panel-gauges">
	{#each $system as gauge}
		<Gauge
			label="{gauge.name}"
			value="{Math.round(gauge.value || 0)}"
			max="{Math.floor(gauge.max || 100)}"
			unit="{gauge.unit}"
			warn="{gauge.warning}"
			alert="{gauge.alert}"
			/>
	{/each}
</div>

<script>
import Gauge from './gauge';
import {system} from '../store';

</script>
