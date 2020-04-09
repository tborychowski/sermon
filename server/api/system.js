const cpuData = require('../lib/cpu');
const memData = require('../lib/mem');


module.exports =  async (req, res) => {
	const cpu = await cpuData();
	const mem = await memData();

	return res.json({
		cpu,
		mem
	});
};
