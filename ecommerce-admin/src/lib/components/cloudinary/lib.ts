import type { ConfigOptions } from '@cloudinary-util/url-loader';

export function getCloudinaryConfig(config?: ConfigOptions): ConfigOptions {
	const cloudName = config?.cloud?.cloudName ?? process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

	if (!cloudName) {
		throw new Error(
			'A Cloudinary Cloud name is required, please make sure PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.'
		);
	}

	const apiKey = config?.cloud?.apiKey ?? process.env.PUBLIC_CLOUDINARY_API_KEY;
	const secureDistribution =
		config?.url?.secureDistribution ?? process.env.PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION;
	const privateCdn = config?.url?.privateCdn ?? process.env.PUBLIC_CLOUDINARY_PRIVATE_CDN;

	return Object.assign(
		{
			cloud: {
				...config?.cloud,
				apiKey,
				cloudName
			},
			url: {
				...config?.url,
				secureDistribution,
				privateCdn
			}
		},
		config
	);
}
