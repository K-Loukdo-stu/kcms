import adapter from '@sveltejs/adapter-node';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csrf: {
      checkOrigin: false,
    },
		alias: {
			'$components': path.resolve('./src/components'),
			'$lib': path.resolve('./src/lib'),
			'$providers': path.resolve('./src/providers'),
		},
	}
};

export default config;
