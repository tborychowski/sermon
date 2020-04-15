const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {isDev, logger, readJsonFile} = require('./lib');
const collectData = require('./collector');
const app = express();
const port = process.env.PORT || 3000;
const config = readJsonFile('config.json');

function sendView (res, view) {
	res.sendFile(view, { root: __dirname });
}

function rootPath (req, res) {
	if (req.path.substr(1)) return res.redirect('/');
	sendView(res, 'index.html');
}


if (isDev) app.use(require('connect-livereload')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/', require('./api'));
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/', rootPath);

logger.info('--- STARTING -----------------------------------------------------');
setInterval(collectData, config.refreshInterval || 5000);
collectData();

app.listen(port, () => logger.info('Server started: http://localhost:' + port));
