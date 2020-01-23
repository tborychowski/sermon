<div class="panel">
	<div class="title">
		<h2>CPU</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{JSON.stringify($proc)}
	</div>
</div>

<script>
import {proc} from '../store';
import {EVENT} from '../lib';

const refresh = () => proc.reload();

EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
