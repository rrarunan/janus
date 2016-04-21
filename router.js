import Router from 'koa-router';
import req from 'requisition';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'janus';
});

export default router;
