<div class="panel panel-gauges">
	{#each $system as gauge}
		<Gauge
			label="{gauge.name}"
			value="{gauge.value || 0}"
			max="{gauge.max || 100}"
			unit="{gauge.unit}"
			warn="{gauge.warning}"
			alert="{gauge.alert}"
			ticks="{getTicks(gauge.max)}"
			/>
	{/each}
</div>

<script>
import Gauge from './gauge';
import {system} from '../store';

function getTicks (max = 100, min = 0) {
	const step = Math.ceil((max - min) / 10);
	return new Array(max < 50 ? 9 : 11)
		.fill(0)
		.map((n, i) => Math.ceil(i * step))
		.join(',');
}

</script>
