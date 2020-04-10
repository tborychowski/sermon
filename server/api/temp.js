const { readFile } = require('../lib/util');
const path = require('path');

// /sys/class/thermal/thermal_zone0/temp
const zoneTemp = path.join(process.cwd(), '/proc/temp');


module.exports = () => readFile(zoneTemp).then(t => parseInt(t, 10) / 1000);
