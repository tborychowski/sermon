<header><h1>Storage</h1></header>
<div class="panel panel-disks">

		{#each $disks as disk}
		<Disk data="{disk}"/>
	{/each}
</div>

<script>
import Disk from './disk';
import {disks} from '../store';

</script>
