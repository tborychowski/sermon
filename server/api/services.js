const services = require('../lib/services');

module.exports =  (req, res) => {
	services().then(info => res.json(info));
};
