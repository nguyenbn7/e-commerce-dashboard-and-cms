import prisma from '$lib/server/prisma';

interface Params {
	id: string;
	storeId: string;
}

interface Data {
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

interface InsertData extends Data {
	storeId: string;
}

export async function getProduct(params: Params) {
	const { id, storeId } = params;

	return prisma.product.findUnique({
		where: {
			id,
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

export async function createProduct(data: InsertData) {
	const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived, storeId } =
		data;

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

export async function getProducts(params: {
	storeId: string;
	categoryId?: string;
	isFeatured?: boolean;
	colorId?: string;
	sizeId?: string;
}) {
	const { storeId, categoryId, isFeatured, colorId, sizeId } = params;

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

export async function updateProduct(params: Params, data: Data) {
	const { id, storeId } = params;
	const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = data;

	await prisma.product.update({
		where: {
			id,
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
			id,
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

export async function deleteProduct(params: Params) {
	const { id, storeId } = params;

	return prisma.product.delete({
		where: {
			id,
			storeId
		}
	});
}
