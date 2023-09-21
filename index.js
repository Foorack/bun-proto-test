// import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
//
// Configure Express
//
const app = express();

// Print out proto
app.get('/', function (req, res) {
	console.log('proto:', req.protocol);
	const runtime = typeof Bun !== 'undefined' ? 'Bun' : 'Node';
	res.status(200).end('OK : ' + req.protocol + ' : ' + runtime);
});

// Start the application
//http.createServer(app).listen(80, '0.0.0.0');
const httpsOptions = {
	key: fs.readFileSync('./certs/cert.key'),
	cert: fs.readFileSync('./certs/cert.pem'),
};
https.createServer(httpsOptions, app).listen(4343);

console.log('Server started, listening on https://localhost:4343/');
