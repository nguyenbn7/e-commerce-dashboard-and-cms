import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	const paidOrders = await prisma.order.findMany({
		where: {
			storeId: Number(storeId),
			isPaid: true
		},
		include: {
			orderItems: {
				include: {
					product: true
				}
			}
		}
	});

	const totalRevenue = paidOrders.reduce((total, order) => {
		const orderTotal = order.orderItems.reduce((orderSum, item) => {
			return orderSum + item.product.price;
		}, 0);

		return total + orderTotal;
	}, 0);

	const salesCount = await prisma.order.count({
		where: {
			storeId: Number(storeId),
			isPaid: true
		}
	});

	const stockCount = await prisma.product.count({
		where: {
			storeId: Number(storeId),
			isArchived: false
		}
	});

	return {
		totalRevenue: totalRevenue / 100,
		salesCount,
		stockCount
	};
}) satisfies PageServerLoad;
