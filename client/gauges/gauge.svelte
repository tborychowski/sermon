<div class="gauge">
	<canvas
		data-type="radial-gauge"
		data-units="{unit}"
		data-title="{label}"
		data-value="{value}"
		data-min-value="{min}"
		data-max-value="{max}"
		data-minor-ticks="2"
		data-stroke-ticks="true"
		data-major-ticks="[{ticks}]"
		data-highlights="{`[
			{"from": 0, "to": ${warn}, "color": "#408062"},
			{"from": ${warn}, "to": ${alert}, "color": "#af8a1a"},
			{"from": ${alert}, "to": ${max}, "color": "#8b4848"}
		]`}"
		data-ticks-angle="225"
		data-start-angle="67.5"
		data-color-major-ticks="#ddd"
		data-color-minor-ticks="#ddd"
		data-color-title="#eee"
		data-color-units="#ccc"
		data-color-numbers="#eee"
		data-color-plate="#333"
		data-border-shadow-width="0"
		data-borders="false"

		data-needle-type="arrow"
		data-needle-width="2"
		data-needle-circle-size="7"
		data-needle-circle-outer="true"
		data-needle-circle-inner="false"

		data-animation-duration="2000"
		data-animation-rule="elastic"

		data-color-needle-circle-outer="#333"
		data-color-needle-circle-outer-end="#111"
		data-color-needle-circle-inner="#111"
		data-color-needle-circle-inner-end="#222"

		data-value-box="false"
	></canvas>
</div>

<script>
export let label='';
export let value=0;
export let min=0;
export let max=100;
export let unit='';
export let ticks = '0,10,20,30,40,50,60,70,80,90,100';
export let warn = 30;
export let alert = 60;
</script>
