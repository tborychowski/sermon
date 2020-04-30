<div class="summary" on:click>
	{#if allFine}
		<div class="service-status online">All services online</div>
	{:else if allDown}
		<div class="service-status offline blink">All systems down!</div>
	{:else}
		{#if offline.length}
			<div class="service-status offline"><em>{offline.length}</em> offline</div>
		{/if}
		{#if online.length}
			<div class="service-status online"><em>{online.length}</em> online</div>
		{/if}
	{/if}
</div>

<script>
import {services} from '../store';
let online, offline;

$:online = $services.filter(s => s.status === 'online');
$:offline = $services.filter(s => s.status === 'offline');
$:allFine = ($services.length > 0 && $services.length === online.length);
$:allDown = ($services.length > 0 && $services.length === offline.length);
</script>
