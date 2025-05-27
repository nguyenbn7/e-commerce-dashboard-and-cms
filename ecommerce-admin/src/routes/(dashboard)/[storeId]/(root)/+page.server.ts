import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ params }) => {
	const { storeId } = params;

	const paidOrders = await prisma.order.findMany({
		where: {
			storeId,
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
			storeId,
			isPaid: true
		}
	});

	const stockCount = await prisma.product.count({
		where: {
			storeId,
			isArchived: false
		}
	});

	const monthlyRevenue: { [key: number]: number } = {};

	for (const order of paidOrders) {
		const month = order.createdAt.getMonth();
		let revenueForOrder = 0;

		for (const item of order.orderItems) {
			revenueForOrder += item.product.price;
		}

		monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
	}

	const graphData = [
		{ name: 'Jan', total: 0 },
		{ name: 'Feb', total: 0 },
		{ name: 'Mar', total: 0 },
		{ name: 'Apr', total: 0 },
		{ name: 'May', total: 0 },
		{ name: 'Jun', total: 0 },
		{ name: 'Jul', total: 0 },
		{ name: 'Aug', total: 0 },
		{ name: 'Sep', total: 0 },
		{ name: 'Oct', total: 0 },
		{ name: 'Nov', total: 0 },
		{ name: 'Dec', total: 0 }
	];

	for (const [month, _] of Object.entries(monthlyRevenue)) {
		graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
	}

	return {
		totalRevenue: totalRevenue / 100,
		salesCount,
		stockCount,
		graphRevenue: graphData
	};
}) satisfies PageServerLoad;
