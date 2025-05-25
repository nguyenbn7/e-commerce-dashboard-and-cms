import type { ColumnDef } from '@tanstack/table-core';
import type { getBillboards } from '$features/billboards/server/repository';

import { CellAction } from '$features/billboards/components';

import { renderComponent } from '$lib/components/ui/data-table';

export type BillboardColumn = ArrayElement<Awaited<ReturnType<typeof getBillboards>>>;

export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: 'label',
		header: 'Label'
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
		accessorKey: 'isFeatured',
		header: 'Featured'
	},
	{
		id: 'actions',
		cell: ({ row }) => renderComponent(CellAction, { data: row.original })
	}
];
