<div class="panel">
	<div class="title">
		<h2>System</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{JSON.stringify(data)}
	</div>
</div>

<script>
import {EVENT, get} from '../lib';
let data = {};

const refresh = async () => data = await get('system');


EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
