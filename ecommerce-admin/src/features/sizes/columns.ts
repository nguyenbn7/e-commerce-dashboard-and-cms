import type { ColumnDef } from '@tanstack/table-core';
import type { getSizes } from '$features/sizes/server/repository';

import { CellAction } from '$features/sizes/components';

import { renderComponent } from '$lib/components/ui/data-table';

export type SizeColumn = ArrayElement<Awaited<ReturnType<typeof getSizes>>>;

export const columns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'value',
		header: 'Value'
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
