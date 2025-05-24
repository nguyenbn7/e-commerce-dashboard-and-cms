import prisma from '$lib/server/prisma';

export async function createOrder(
	params: {
		storeId: string;
	},
	data: {
		productIds: string[];
	}
) {
	const { storeId } = params;
	const { productIds } = data;

	return prisma.order.create({
		data: {
			storeId,
			isPaid: false,
			orderItems: {
				create: productIds.map((id) => ({
					product: {
						connect: {
							id
						}
					}
				}))
			}
		}
	});
}
