import Router from 'koa-router';
import req from 'requisition';
import r from 'superagent';

const CONTROLLER_HOST = process.env.CONTROLLER_HOST;
const BASE_AUTH = process.env.UCP_API_AUTH; //This is dev only
const router = new Router();

const baseGet = async (ctx) => {
  console.log(ctx.headers);
  const resp = await req(`https://${CONTROLLER_HOST}${ctx.request.url}`)
    .set('Authorization', ctx.headers.authorization)
    .query(ctx.query);
  // console.log(resp);
  ctx.status = resp.response.statusCode;
  ctx.status === 200 ? ctx.body = await resp.json() : ctx.body = resp.response.statusMessage;
}

router.post('/auth/login', async (ctx, next) => {
  const auth = await req.post(`https://${CONTROLLER_HOST}/auth/login`)
    .send(ctx.request.body);
  console.log('Response ', auth.json());
  ctx.body = await auth.json();
});

router.post('/auth/logout', async (ctx, next) => {
  // console.log(ctx.request.body);
  const auth = await req.post(`https://${CONTROLLER_HOST}/auth/logout`)
    .send(ctx.request.body);
});

router.get('/api/:splat', async (ctx, next) => {
  await baseGet(ctx);
});

router.get('/info', async (ctx, next) => {
  await baseGet(ctx);
});

router.get('/:entities/json', async (ctx, next) => {
  await baseGet(ctx);
});

router.get('/', async (ctx, next) => {
  ctx.body = 'janus';
});

export default router;
