import type { ColumnDef } from '@tanstack/table-core';
import type { getColors } from '$features/colors/server/repository';
import { renderComponent } from '$lib/components/ui/data-table';
import { CellAction, ColorDisplay } from '$features/colors/components';

export type ColorColumn = ArrayElement<Awaited<ReturnType<typeof getColors>>>;

export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell({ row }) {
			return renderComponent(ColorDisplay, { colorValue: row.original.value });
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
