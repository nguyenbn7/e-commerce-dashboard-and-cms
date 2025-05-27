import type { ColumnDef } from '@tanstack/table-core';
import type { getOrders } from '$features/orders/server/repository';
import { formatter as currencyFormatter } from '$lib/currency';

export type OrderColumn = ArrayElement<Awaited<ReturnType<typeof getOrders>>>;

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'products',
		header: 'Products',
		cell({ row }) {
			return row.original.orderItems.map((orderItem) => orderItem.product.name).join(', ');
		}
	},
	{
		accessorKey: 'buyer',
		header: 'Buyer'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'phone',
		header: 'Phone'
	},
	{
		accessorKey: 'address',
		header: 'Address'
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total price',
		cell({ row }) {
			return currencyFormatter.format(
				row.original.orderItems.reduce((total, item) => {
					return total + Number(item.product.price);
				}, 0) / 100
			);
		}
	},
	{
		accessorKey: 'isPaid',
		header: 'Paid'
	}
];
