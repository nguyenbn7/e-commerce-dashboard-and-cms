import type { ColumnDef } from '@tanstack/table-core';
import type { getCategories } from './server/repository';
import { toast } from 'svelte-sonner';
import { renderComponent } from '$lib/components/ui/data-table';
import { CellAction } from './components';

export type Category = ArrayElement<Awaited<ReturnType<typeof getCategories>>>;

export const columns: ColumnDef<Category>[] = [
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
		cell: ({ row }) =>
			renderComponent(CellAction, {
				data: row.original,
				onSuccess: () => {
					toast.success('Billboard deleted');
					window.location.reload();
				},
				onError() {
					toast.error('Something went wrong');
				}
			})
	}
];
