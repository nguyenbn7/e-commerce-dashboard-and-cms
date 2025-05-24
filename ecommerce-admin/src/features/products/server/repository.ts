import prisma from '$lib/server/prisma';

export async function getProduct(storeId: string, productId: string) {
	return prisma.product.findUnique({
		where: {
			id: productId,
			storeId
		},
		include: {
			images: true,
			category: true,
			size: true,
			color: true
		}
	});
}

export async function createProduct(
	storeId: string,
	data: {
		name: string;
		price: number;
		categoryId: string;
		colorId: string;
		sizeId: string;
		images: {
			url: string;
		}[];
		isFeatured?: boolean;
		isArchived?: boolean;
	}
) {
	const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = data;

	return prisma.product.create({
		data: {
			name,
			price,
			storeId,
			categoryId,
			colorId,
			sizeId,
			isArchived,
			isFeatured,
			images: {
				createMany: {
					data: [...images]
				}
			}
		}
	});
}

export async function getProducts(
	storeId: string,
	categoryId?: string,
	isFeatured?: boolean,
	colorId?: string,
	sizeId?: string
) {
	return prisma.product.findMany({
		where: {
			storeId,
			categoryId,
			colorId,
			sizeId,
			isFeatured: isFeatured ? true : undefined,
			isArchived: false
		},
		include: {
			images: true,
			category: true,
			size: true,
			color: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateProduct(
	storeId: string,
	productId: string,
	data: {
		name: string;
		price: number;
		categoryId: string;
		colorId: string;
		sizeId: string;
		images: {
			url: string;
		}[];
		isFeatured?: boolean;
		isArchived?: boolean;
	}
) {
	const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = data;

	await prisma.product.update({
		where: {
			id: productId,
			storeId
		},
		data: {
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			isArchived,
			isFeatured,
			images: {
				deleteMany: {}
			}
		}
	});

	return prisma.product.update({
		where: {
			id: productId,
			storeId
		},
		include: {
			images: true,
			category: true,
			size: true,
			color: true
		},
		data: {
			images: {
				createMany: {
					data: [...images]
				}
			}
		}
	});
}

export async function deleteProduct(storeId: string, productId: string) {
	return prisma.product.delete({
		where: {
			id: productId,
			storeId
		}
	});
}
