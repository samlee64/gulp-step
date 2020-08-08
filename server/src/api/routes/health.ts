import * as Router from 'koa-router';

const router = new Router({ prefix: '/health' });

router.get('/');

export default router
