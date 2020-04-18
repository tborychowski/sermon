const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {isDev, logger, readJsonFile} = require('./lib');
const collectData = require('./collector');
const app = express();
const port = process.env.PORT || 3000;
const config = readJsonFile('config.json');

if (isDev) app.use(require('connect-livereload')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/data', (req, res) => {
	const data = readJsonFile('data.json');
	res.status(200).json(data || {});
});
app.use('/api', (req, res) => res.send('Hello from API!'));
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/', (req, res) => {
	if (req.path.substr(1)) res.redirect('/');
	else res.sendFile('index.html', { root: __dirname });
});

logger.info('--- STARTING -----------------------------------------------------');
setInterval(collectData, config.refreshInterval || 5000);
collectData();

app.listen(port, () => logger.info('Server started: http://localhost:' + port));
