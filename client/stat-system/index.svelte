<div class="panel">
	<div class="title">
		<h2><em>{data.hostname || ''}</em> ({data.ip || '0.0.0.0'})</h2>
		<div>{data.system || ''}</div>
		<div>up: {data.uptime || ''}</div>
	</div>
	<div class="content system-content">
		<Gauge
			label="Temperature"
			value="{data.temp}"
			unit="°C"
			warn="40"
			alert="60"
		/>
		<Gauge
			label="RAM"
			value="{parseFloat(data.memUsed) || 0}"
			max="{parseFloat(data.memTotal) || 32}"
			ticks="0,4,8,12,16,24,28,32"
			warn="24"
			alert="28"/>
		<Gauge label="1 min" value="{data.load[0]}"/>
		<Gauge label="5 min" value="{data.load[1]}"/>
		<Gauge label="15 min" value="{data.load[2]}"/>
	</div>
</div>

<script>
import {onMount} from 'svelte';
import Gauge from '../gauge';
import {EVENT, get} from '../lib';
let data = {load: []};

onMount(() => {
	EVENT.on(EVENT.refresh.all, refresh);
	refresh();
});

const refresh = async () => data = await get('system');

</script>
