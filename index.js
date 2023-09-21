// import http from 'http';
import https from 'https';
import fs from 'fs';

import express from 'express';
import session, { MemoryStore } from 'express-session';

// Generate Secure Random Secret
const SESSION_SECRET = "dumplings!";

//
// Configure Express
//
const app = express();
app.use(
	session({
		name: 'sgs',
		store: new MemoryStore({}),
		secret: SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: true,
			sameSite: 'lax', // SameSite security
		},
	}),
);
app.use(function logging(req, res, next) {
	// Log the request
	const ip = req.socket.remoteAddress.indexOf(':') > -1 ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;
	console.log('HTTP: ' + ip + ' ' + req.method + ' ' + req.url);
	next();
});

//
// Configure the routes
//

// Print out proto
app.get('/', function (req, res) {
	console.log('proto:', req.protocol);
	const runtime = typeof Bun !== 'undefined' ? 'Bun' : 'Node';
	res.status(200).end('OK : ' + req.protocol + ' : ' + runtime);
});

//
// TLS
//

const ENV_HTTPS_KEY_PATH = './certs/cert.key';
const ENV_HTTPS_CERT_PATH = './certs/cert.pem';

// Start the application
//http.createServer(app).listen(80, '0.0.0.0');
const httpsOptions = {
	key: fs.readFileSync(ENV_HTTPS_KEY_PATH),
	cert: fs.readFileSync(ENV_HTTPS_CERT_PATH),
};
https.createServer(httpsOptions, app).listen(4343);

console.log('Server started, listening on https://localhost:4343/');
