import { Hono } from 'hono';
import stores from '$features/stores/server/route';

const app = new Hono().basePath('/api').route('/stores', stores);

export default app;

export type APIAppType = typeof app;
