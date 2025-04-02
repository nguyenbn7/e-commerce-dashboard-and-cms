import type { RequestHandler } from './$types';
import app from '$lib/server/route';

export const fallback: RequestHandler = async ({ request }) => app.fetch(request);
