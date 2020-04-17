<div class="panel">
	<div class="content disks-content">
		{#each disks as disk}
			<Disk data="{disk}"/>
		{/each}
	</div>
</div>

<script>
import Disk from './disk';
import {system} from '../store';

$:disks = $system.disks || [];

</script>
