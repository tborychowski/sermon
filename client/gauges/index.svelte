<div class="panel">
	<div class="content gauges-content">
		<Gauge
			size="S"
			label="Temperature"
			value="{$system.temp}"
			unit="°C"
			warn="40"
			alert="60"
		/>
		<Gauge
			size="M"
			label="RAM"
			value="{parseFloat($system.memUsed) || 0}"
			max="{parseFloat($system.memTotal) || 32}"
			ticks="0,4,8,12,16,24,28,32"
			warn="24"
			alert="28"/>
		<Gauge label="1 min" value="{$system.load[0]}" size="L"/>
		<Gauge label="5 min" value="{$system.load[1]}" size="M"/>
		<Gauge label="15 min" value="{$system.load[2]}" size="S"/>
	</div>
</div>

<script>
import Gauge from './gauge';
import {system} from '../store';

</script>
