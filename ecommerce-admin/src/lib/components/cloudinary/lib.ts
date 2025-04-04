import type { ConfigOptions } from '@cloudinary-util/url-loader';
import {
	PUBLIC_CLOUDINARY_CLOUD_NAME,
	PUBLIC_CLOUDINARY_API_KEY,
	PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION,
	PUBLIC_CLOUDINARY_PRIVATE_CDN
} from '$env/static/public';

export function getCloudinaryConfig(config?: ConfigOptions): ConfigOptions {
	const cloudName = config?.cloud?.cloudName ?? PUBLIC_CLOUDINARY_CLOUD_NAME;

	if (!cloudName) {
		throw new Error(
			'A Cloudinary Cloud name is required, please make sure PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.'
		);
	}

	const apiKey = config?.cloud?.apiKey ?? PUBLIC_CLOUDINARY_API_KEY;
	const secureDistribution =
		config?.url?.secureDistribution ?? PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION;
	const privateCdn = config?.url?.privateCdn ?? PUBLIC_CLOUDINARY_PRIVATE_CDN;

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
