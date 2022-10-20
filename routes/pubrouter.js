const Router = require('koa-router');
const pub = new Router();
pub.get('/', async ctx => {
	ctx.body = "hello world";
})

module.exports = pub;
