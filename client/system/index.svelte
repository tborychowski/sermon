<div class="panel">
	<div class="title">
		<div>{$system.system || ''}</div>
		<div>up: {$system.uptime || ''}</div>
		<div>updated at: {$updatedAt || ''}</div>
	</div>
	<div class="content system-content">
		<Gauge label="1 min" value="{$system.load[0]}"/>
		<Gauge label="5 min" value="{$system.load[1]}"/>
		<Gauge label="15 min" value="{$system.load[2]}"/>
		<Gauge
			label="RAM"
			value="{parseFloat($system.memUsed) || 0}"
			max="{parseFloat($system.memTotal) || 32}"
			ticks="0,4,8,12,16,24,28,32"
			warn="24"
			alert="28"/>
		<Gauge
			label="Temperature"
			value="{$system.temp}"
			unit="°C"
			warn="40"
			alert="60"
		/>
	</div>
	<div class="content disks-content">
		{#each disks as disk}
			<Progressbar label="{formatLabel(disk)}" progress="{disk.capacity}" />
		{/each}
	</div>
</div>

<script>
import Gauge from '../gauge';
import Progressbar from '../progressbar';
import {system, updatedAt} from '../store';

$:disks = $system.disks || [];

function formatLabel (disk) {
	return `
	<span><em>${disk.name}</em></span>
	<span>used: <em>${disk.used}</em></span>
	<span>free: <em>${disk.free}</em></span>
	<span><em>${disk.total}</em></span>`;
}
</script>
