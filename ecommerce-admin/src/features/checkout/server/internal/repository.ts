import prisma from '$lib/server/prisma';

export async function getProducts(productIds: Array<number>) {
	return prisma.product.findMany({
		where: {
			id: {
				in: productIds
			}
		}
	});
}
