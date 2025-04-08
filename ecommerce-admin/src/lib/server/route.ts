import { Hono } from 'hono';
import stores from '$features/stores/server/route';
import billboards from '$features/billboards/server/route';
import categories from '$features/categories/server/route';
import sizes from '$features/sizes/server/route';
import colors from '$features/colors/server/route';

const app = new Hono()
	.basePath('/api')
	.route(
		'/stores',
		stores
			.route('/:storeId/billboards', billboards)
			.route('/:storeId/categories', categories)
			.route('/:storeId/sizes', sizes)
			.route('/:storeId/colors', colors)
	);

export default app;

export type APIAppType = typeof app;
