<div class="gauge">
	<canvas
		data-type="radial-gauge"
		data-units="{unit}"
		data-title="{label}"
		data-value="{value}"
		data-min-value="{min}"
		data-max-value="{max}"
		data-ticks-angle="225"
		data-start-angle="67.5"

		data-highlights="{`[
			{"from": 0, "to": ${warn}, "color": "#408062"},
			{"from": ${warn}, "to": ${alert}, "color": "#af8a1a"},
			{"from": ${alert}, "to": ${max}, "color": "#8b4848"}
		]`}"
		data-highlights-width="8"
		data-exact-ticks="true"
		data-stroke-ticks="true"
		data-major-ticks="[{getTicks(max, min)}]"
		data-color-major-ticks="#ddd"
		data-bar-stroke-width="0"

		data-minor-ticks="{max < 50 ? 2 : 5}"
		data-color-minor-ticks="#ddd"

		data-color-title="#eee"
		data-color-units="#eee"
		data-color-numbers="#eee"
		data-color-plate="#000"
		data-border-shadow-width="0"
		data-borders="false"
		data-bar-width="0"

		data-needle-type="arrow"
		data-needle-width="1"
		data-needle-circle-size="5"
		data-needle-circle-outer="true"
		data-needle-circle-inner="true"
		data-needle-shadow="false"

		data-color-needle-circle-outer="#666"
		data-color-needle-circle-outer-end="#333"
		data-color-needle-circle-inner="#333"
		data-color-needle-circle-inner-end="#666"

		data-animation-duration="2000"
		data-animation-rule="elastic"

		data-color-border-outer="false"
		data-border-outer-width="false"
		data-border-middle-width="false"
		data-border-inner-width="false"

		data-value-box="false"
	></canvas>
</div>

<script>
export let label='';
export let value=0;
export let min=0;
export let max=100;
export let unit='';
export let warn = 30;
export let alert = 60;


function getTicks (_max = 100, _min = 0) {
	const step = Math.ceil((_max - _min) / 10);
	return new Array(_max < 50 ? 9 : 11)
		.fill(0)
		.map((n, i) => Math.ceil(i * step))
		.join(',');
}

</script>
