import { Hono } from 'hono';
import stores from '$features/stores/server/router';
import billboards from '$features/billboards/server/router';
import categories from '$features/categories/server/router';
import sizes from '$features/sizes/server/router';
import colors from '$features/colors/server/router';
import products from '$features/products/server/router';
import checkout from '$features/checkout/server/router';
import webhook from '$lib/server/webhook';

const app = new Hono()
	.basePath('/api')
	.route('/webhook', webhook)
	.route('/stores/:storeId/billboards', billboards)
	.route('/stores/:storeId/categories', categories)
	.route('/stores/:storeId/sizes', sizes)
	.route('/stores/:storeId/colors', colors)
	.route('/stores/:storeId/products', products)
	.route('/stores/:storeId/checkout', checkout)
	.route('/stores', stores);

export default app;
export type APIAppType = typeof app;
