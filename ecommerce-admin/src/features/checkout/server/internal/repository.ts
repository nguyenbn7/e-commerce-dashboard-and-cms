import prisma from '$lib/server/prisma';

export async function getProducts(productIds: Array<string>) {
	return prisma.product.findMany({
		where: {
			id: {
				in: productIds
			}
		}
	});
}
