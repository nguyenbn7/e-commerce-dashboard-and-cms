import prisma from '$lib/server/prisma';

export async function getOrders(storeId: string) {
	return prisma.order.findMany({
		where: {
			storeId
		},
		include: {
			orderItems: {
				include: {
					product: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}
