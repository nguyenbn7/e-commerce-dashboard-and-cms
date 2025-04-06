import { Hono } from 'hono';
import stores from '$features/stores/server/route';
import billboards from '$features/billboards/server/route';
import categories from '$features/categories/server/route';

const app = new Hono()
	.basePath('/api')
	.route(
		'/stores',
		stores.route('/:storeId/billboards', billboards).route('/:storeId/categories', categories)
	);

export default app;

export type APIAppType = typeof app;
