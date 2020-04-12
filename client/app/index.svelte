<header class="header">
	<h1><em>Home</em> (0.0.0.0)</h1>
	<button on:click="{refresh}">Refresh</button>
</header>
<System />
<Services />


<script>
import {EVENT} from '../lib';
import System from '../system';
import Services from '../services';


function refresh () {
	EVENT.fire(EVENT.refresh.all);
}
</script>
