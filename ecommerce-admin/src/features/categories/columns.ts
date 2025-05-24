import type { ColumnDef } from '@tanstack/table-core';
import type { getCategories } from '$features/categories/server/repository';

import { CellAction } from '$features/categories/components';

import { renderComponent } from '$lib/components/ui/data-table';

export type CategoryColumn = ArrayElement<Awaited<ReturnType<typeof getCategories>>>;

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		cell: ({ row }) => row.original.billboard.label
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
