<header class="header">
	<h1><em>{$system.hostname}</em> <small>({$system.hostip})</small></h1>
	<button on:click="{refresh}">Refresh</button>
</header>
<System />
<Services />


<script>
import {system} from '../store';
import {EVENT} from '../lib';
import System from '../system';
import Services from '../services';


function refresh () {
	EVENT.fire(EVENT.refresh.all);
}
</script>
