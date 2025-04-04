import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME
});

export async function uploadImage() {
	try {
		return cloudinary.uploader.upload('', { upload_preset: 'cens9rll' });
	} catch (error) {
		console.error(error);
	}
}
