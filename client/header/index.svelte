<header>
	<h1>{$meta.hostname || ''}</h1>
	<div class="updated-at">updated at: {dateFormat($meta.updatedAt)}</div>
		<!-- <small>({$meta.hostip})</small> -->
</header>


<script>
import {dateFormat} from '../lib';
import {meta} from '../store';

</script>
