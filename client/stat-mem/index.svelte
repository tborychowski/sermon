<div class="panel">
	<div class="title">
		<h2>Memory</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{JSON.stringify($mem)}
	</div>
</div>

<script>
import {mem} from '../store';
import {EVENT} from '../lib';

const refresh = () => mem.reload();

EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
