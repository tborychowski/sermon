<div class="panel">
	<div class="title">
		<h2>Services</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		{JSON.stringify(data)}
	</div>
</div>

<script>
import {EVENT, get} from '../lib';
let data = {};

const refresh = async () => data = await get('services');


EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
