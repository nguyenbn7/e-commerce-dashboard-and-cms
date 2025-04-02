// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthObject } from '@clerk/backend';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthObject;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
