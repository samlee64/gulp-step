import * as Router from 'koa-router';

import health from './health';

const router = new Router();

router.use(health.routes());

export default router;
