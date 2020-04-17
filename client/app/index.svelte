<header>
	<h1><em>{$system.hostname}</em></h1>
	<div class="updated-at">updated at: {$updatedAt || ''}</div>
		<!-- <small>({$system.hostip})</small> -->
	<Summary/>
</header>
<System />
<Services />
<footer></footer>

<script>
import {system, updatedAt} from '../store';
import System from '../system';
import Summary from '../summary';
import Services from '../services';


</script>
