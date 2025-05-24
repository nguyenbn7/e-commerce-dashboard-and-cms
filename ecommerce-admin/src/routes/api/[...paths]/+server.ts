import type { RequestHandler } from './$types';

import app from '$lib/server/router';

export const fallback: RequestHandler = async ({ request }) => app.fetch(request);
