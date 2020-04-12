<header class="header">
	<h1><em>Ser</em>ver <em>Mon</em>itor</h1>

	<button on:click="{refresh}">Refresh</button>
</header>
<section class="main">
	<System />
	<Services />
</section>

<script>
import {EVENT} from '../lib';
import System from '../system';
import Services from '../services';


function refresh () {
	EVENT.fire(EVENT.refresh.all);
}
</script>
