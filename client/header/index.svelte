<header>
	<h1><em>{$system.hostname}</em></h1>
	<div class="updated-at">updated at: {$updatedAt || ''}</div>
		<!-- <small>({$system.hostip})</small> -->
	<Summary/>
</header>


<script>
import {system, updatedAt} from '../store';
import Summary from './summary';


</script>
