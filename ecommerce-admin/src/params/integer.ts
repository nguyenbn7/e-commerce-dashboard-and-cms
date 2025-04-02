import type { ParamMatcher } from '@sveltejs/kit';
import { z } from 'zod';

export const match = ((param: string) => {
	return z.coerce.number().safeParse(param).success;
}) satisfies ParamMatcher;
