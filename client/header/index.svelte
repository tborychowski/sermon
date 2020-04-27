<header>
	<h1><em>{$meta.hostname || ''}</em></h1>
	<div class="updated-at">updated at: {dateFormat($meta.updatedAt)}</div>
		<!-- <small>({$meta.hostip})</small> -->
</header>


<script>
import {dateFormat} from '../lib';
import {meta} from '../store';

</script>
