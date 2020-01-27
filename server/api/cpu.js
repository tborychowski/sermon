const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const base = path.resolve(process.cwd(), 'proc');


function parseCpuInfo (info) {
	const lines = info.split(os.EOL);
	const cores = [];
	let i = 0;
	lines.forEach(l => {
		if (!l) return i += 1;
		let [name, value] = l.split(':');
		name = ('' + name).trim();
		value = ('' + value).trim();
		cores[i] = cores[i] || {};
		cores[i][name] = value;
	});
	const proc = {}, c = cores[0];
	proc.name = c['model name'] || c['model'];
	proc.cache = c['cache size'] || c['l2 cache'];
	proc.speed = (c['cpu MHz'] || c.clock) + 'MHz';
	proc.cores = cores.length;
	return proc;
}

function cpuInfo () {
	return fs.readFile(path.join(base, 'cpuinfo'), 'utf8').then(parseCpuInfo);
}

// if ($frequency == 'N.A')
//     if ($f = shell_exec('cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq')) {
//         $f = $f / 1000;
//         $frequency = $f.' MHz';
//     }
// }
// CPU Temp
//     if (file_exists('/usr/bin/sensors') && exec('/usr/bin/sensors | grep -E "^(CPU Temp|Core 0)" | cut -d \'+\' -f2 | cut -d \'.\' -f1', $t)) {
//         if (isset($t[0])) $temp = $t[0].' °C';
//     }
//     else {
//         if (exec('cat /sys/class/thermal/thermal_zone0/temp', $t)) {
//             $temp = round($t[0] / 1000).' °C';
//         }
//     }
// }


module.exports =  (req, res) => {
	cpuInfo()
		.then(info => {
			res.json(info);
		});
};
