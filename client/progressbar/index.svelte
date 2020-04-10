<div class="progressbar {barType}">
	<div class="progressbar-label">{@html label}</div>
	<div class="progressbar-bar">
		<div class="progressbar-progress" style="width: {progress}%"></div>
	</div>
</div>

<script>
export let label = '';
export let progress = 0;
export let warning = 80;
export let alert = 90;

$:barType = progress > alert ? 'alert' : progress > warning ? 'warning' : 'info';
</script>
