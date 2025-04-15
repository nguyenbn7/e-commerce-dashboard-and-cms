import type { ColumnDef } from '@tanstack/table-core';
import type { getProducts } from '$features/products/server/repository';
import { renderComponent } from '$lib/components/ui/data-table';
import { formatter as currencyFormatter } from '$lib/currency';
import { ColorDisplay } from '$features/colors/components';
import { CellAction } from '$features/products/components';

export type ProductColumn = ArrayElement<Awaited<ReturnType<typeof getProducts>>>;

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'isArchived',
		header: 'Archived'
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured'
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell({ row }) {
			return currencyFormatter.format(row.original.price / 100);
		}
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell({ row }) {
			return row.original.category.name;
		}
	},
	{
		accessorKey: 'size',
		header: 'Size',
		cell({ row }) {
			return row.original.size.name;
		}
	},
	{
		accessorKey: 'color',
		header: 'Color',
		cell({ row }) {
			return renderComponent(ColorDisplay, { colorValue: row.original.color.value });
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell({ row }) {
			return row.original.createdAt.toLocaleString(undefined, {
				month: 'short',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				weekday: 'short'
			});
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => renderComponent(CellAction, { data: row.original })
	}
];
