<div class="disk">
	<div class="disk-screw disk-screw-tl"></div>
	<div class="disk-screw disk-screw-tr"></div>
	<div class="disk-screw disk-screw-bl"></div>
	<div class="disk-screw disk-screw-br"></div>
	<div class="disk-plate">
		<svg width="100%" height="100%" viewBox="0 0 54 54" class="donut">
			<circle class="donut-hole" cx="27" cy="27" r="15.91549430918952"></circle>
			<circle class="donut-ring" cx="27" cy="27" r="15.91549430918952"></circle>
			<circle class="donut-segment" cx="27" cy="27" r="15.91549430918952" stroke-dasharray="{from} {to}"></circle>
		</svg>
	</div>
	<div class="disk-name"><em>{data.name}</em></div>
	<div class="disk-total">{data.free} free<br>{data.total} total</div>
</div>

<script>
export let data = {};

$:from = data.percent;
$:to = 100 - data.percent;

</script>
