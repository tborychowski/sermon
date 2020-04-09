<div class="panel">
	<div class="title">
		<h2>System</h2>
		<button on:click="{refresh}">Refresh</button>
	</div>
	<div class="content">
		<table>
			<tr><td>System:</td><td>{data.system}</td></tr>
			<tr><td>CPU:</td><td>{data.cpu}</td></tr>
			<tr><td>Temperature:</td><td>{data.temp}°C</td></tr>
			<tr><td>Uptime:</td><td>{data.uptime}</td></tr>
			<tr><td>Active Users:</td><td>{data.users}</td></tr>
			<tr><td>Mem:</td><td>{data.memPercent}%</td></tr>
			<tr><td>Load:</td><td>{data.load[0]}%</td></tr>
		</table>
	</div>
</div>

<script>
import {EVENT, get} from '../lib';
let data = {load:[]};

const refresh = async () => data = await get('system');

EVENT.on(EVENT.refresh.all, refresh);
refresh();

</script>
