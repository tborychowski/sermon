<header class="header">
	<h1><em>Ser</em>ver <em>Mon</em>itor</h1>

	<button on:click="{refresh}">Refresh</button>
</header>


<script>
import {EVENT} from '../lib';

function refresh () {
	EVENT.fire(EVENT.refresh.all);
}
</script>
