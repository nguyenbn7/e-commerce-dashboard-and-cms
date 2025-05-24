import { zValidator } from '@hono/zod-validator';
import type { MiddlewareHandler } from 'hono';
import { storeIdSchema } from '../schema';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const validateStore = () =>
	zValidator('param', storeIdSchema, async (result, c) => {
		if (!result.success)
			return c.json({
				title: ReasonPhrases.BAD_REQUEST,
				status_code: StatusCodes.BAD_REQUEST,
				detail: 'Invalid store id'
			});
	});
