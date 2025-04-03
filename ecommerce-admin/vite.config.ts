import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		warmup: {
			clientFiles: ['./src/app.css', "./src/lib/components/*.svelte"],
			ssrFiles: ['./src/hooks.server.ts']
		}
	}
});
