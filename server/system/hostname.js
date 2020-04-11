const { readDataFile } = require('../lib');

// /proc/sys/kernel/hostname
module.exports = () => readDataFile('hostname').then(hn => hn.trim());
