<div class="panel">
	<div class="title"><h2>System</h2></div>
	<div class="content system-content">
		<div class="system-left">
			<table>
				<tr>
					<td class="label">System:</td>
					<td class="value">{data.system || ''}</td>
				</tr>
				<tr>
					<td class="label">CPU:</td>
					<td class="value">{data.cpu || ''}</td>
				</tr>
				<tr>
					<td class="label">Uptime:</td>
					<td class="value">{data.uptime || ''}</td>
				</tr>
				<tr>
					<td class="label">Server time:</td>
					<td class="value">{data.time || ''}</td>
				</tr>
				<tr>
					<td class="label">Active Users:</td>
					<td class="value"><em>{data.users || 0}</em> users</td>
				</tr>
				<tr>
					<td class="label">Temperature:</td>
					<td class="value">
						<Progressbar
							label="<em>{data.temp || ''}°C</em>"
							warning="55"
							alert="75"
							progress="{data.temp}" />
					</td>
				</tr>
			</table>
		</div>
		<div class="system-right">
			<table>
				<tr>
					<td class="label">RAM:</td>
					<td class="value">
						<Progressbar
							label="Free <em>{data.memFree || 0}</em> of <em>{data.memTotal || 0}"
							progress="{data.memPercent}" />
					</td>
				</tr>
				<tr>
					<td class="label">Load 1min:</td>
					<td class="value">
						<Progressbar
							label="<em>{data.load[0] || 0}%</em>"
							progress="{data.load[0]}" />
					</td>
				</tr>
				<tr>
					<td class="label">Load 5min:</td>
					<td class="value">
						<Progressbar
							label="<em>{data.load[1] || 0}%</em>"
							progress="{data.load[1]}" />
					</td>
				</tr>
				<tr>
					<td class="label">Load 15min:</td>
					<td class="value">
						<Progressbar
							label="<em>{data.load[2] || 0}%</em>"
							progress="{data.load[2]}" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>

<script>
import {onMount} from 'svelte';
import Progressbar from '../progressbar';
import {EVENT, get} from '../lib';
let data = {load: []};

onMount(() => {
	EVENT.on(EVENT.refresh.all, refresh);
	refresh();
});

const refresh = async () => data = await get('system');

</script>
