// ssh root@45.89.66.225 (globicam.ru)
const Koa = require('koa');

const fs = require('fs');
const https = require('https');
const path = require('path');
const util = require('util');
const pubrouter = require('./routes/pubrouter.js');
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

var HTTP_PORT = 80;
var HTTPS_PORT = 443;

if (process.env.DEVELOPMENT == "yes") {
    HTTP_PORT = 3000;
    HTTPS_PORT = 8000;
}

const dkey = './data/chel_key.pem';
const dcert = './data/chel_cert.pem';
const ca = './data/chel_ca.cert';
const app = new Koa();

app.use(pubrouter.routes()).use(pubrouter.allowedMethods());

app.on('error', function (err, ctx) {
    console.log('APP ERROR: ', err.message, 'ctx.url : ', ctx.url);
});

 var servak;
    if (process.env.DEVELOPMENT !== "yes") {
		/*
        const ssl_options = {
            key: fs.readFileSync(dkey),
            cert: fs.readFileSync(dcert),
            ca: fs.readFileSync(ca)
        };
        servak = https.createServer(ssl_options, app.callback()).listen(HTTPS_PORT);
        console.log("Must on, port: https://127.0.0.1:", HTTPS_PORT, " started.");
*/
    } else {
        servak = app.listen(process.env.PORT || HTTP_PORT);
        console.log("Must on http or localhost, port: ", HTTP_PORT, " started.");
    }
