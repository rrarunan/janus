import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import convert from 'koa-convert';
import cors from 'koa-cors';
import finalHandler from './lib/finalHandler';
import router as DefaultRouter from './router';
import 'babel-core/register';

const app = new Koa();

app.use(finalHandler());
app.use(views(`${__dirname}/views`, {
  map: {
    html: 'nunjucks',
  },
}));
app.use(logger());
app.use(mount('/static', serve('public')));
app.use(bodyParser());

app.use(convert(session(app)));
app.use(convert(cors()));

// This is the default router
app
  .use(DefaultRouter.routes())
  .use(DefaultRouter.allowedMethods());

export default app;
