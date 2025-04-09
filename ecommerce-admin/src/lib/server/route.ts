import { Hono } from 'hono';
import stores from '$features/stores/server/route';
import billboards from '$features/billboards/server/route';
import categories from '$features/categories/server/route';
import sizes from '$features/sizes/server/route';
import colors from '$features/colors/server/route';
import products from '$features/products/server/route';

const app = new Hono()
	.basePath('/api')
	.route('/stores/:storeId/billboards', billboards)
	.route('/stores/:storeId/categories', categories)
	.route('/stores/:storeId/sizes', sizes)
	.route('/stores/:storeId/colors', colors)
	.route('/stores/:storeId/products', products)
	.route('/stores', stores);

export default app;
export type APIAppType = typeof app;
