const { readDataFile } = require('../lib');


// /sys/class/thermal/thermal_zone0/temp
module.exports = () => readDataFile('temp').then(t => parseInt(t, 10) / 1000);
