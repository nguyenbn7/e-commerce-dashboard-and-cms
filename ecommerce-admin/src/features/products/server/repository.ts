import prisma from '$lib/server/prisma';

export async function getProduct(storeId: number, productId: number) {
	return prisma.product.findUnique({
		where: {
			id: productId,
			storeId
		},
		include: {
			image: true
		}
	});
}

export async function createProduct(
	storeId: number,
	data: { name: string; price: number; categoryId: number; colorId: number; sizeId: number }
) {
	const { name, price, categoryId, colorId, sizeId } = data;

	return prisma.product.create({
		data: {
			name,
			price,
			storeId,
			categoryId,
			colorId,
			sizeId
		}
	});
}

export async function getProducts(storeId: number) {
	return prisma.product.findMany({
		where: {
			storeId
		},
		include: {
			category: true,
			size: true,
			color: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateBillboard(
	storeId: number,
	billboardId: number,
	data: { label: string; imageUrl: string }
) {
	const { label, imageUrl } = data;

	return prisma.billboard.update({
		where: {
			id: billboardId,
			storeId
		},
		data: {
			label,
			imageUrl
		}
	});
}

export async function deleteProduct(storeId: number, productId: number) {
	return prisma.product.delete({
		where: {
			id: productId,
			storeId
		}
	});
}
