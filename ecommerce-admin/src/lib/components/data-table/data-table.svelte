<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		type PaginationState
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		paginationState?: PaginationState;
		searchColumnId?: string;
	};

	let {
		data,
		columns,
		searchColumnId,
		paginationState = { pageIndex: 0, pageSize: 5 }
	}: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>(paginationState);
	let columnFilters = $state<ColumnFiltersState>([]);

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});
</script>

{#if searchColumnId}
	<div class="flex items-center py-4">
		<Input
			placeholder="Search"
			value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table.getColumn(searchColumnId)?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table.getColumn(searchColumnId)?.setFilterValue(e.currentTarget.value);
			}}
			class="max-w-sm"
		/>
	</div>
{/if}

<div class="rounded-md border">
	<Table>
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<TableRow>
					{#each headerGroup.headers as header (header.id)}
						<TableHead>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			{/each}
		</TableHeader>
		<TableBody>
			{#each table.getRowModel().rows as row (row.id)}
				<TableRow data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<TableCell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</TableCell>
					{/each}
				</TableRow>
			{:else}
				<TableRow>
					<TableCell colspan={columns.length} class="h-24 text-center">No results.</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>

<div class="flex items-center justify-end space-x-2 py-4">
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.previousPage()}
		disabled={!table.getCanPreviousPage()}
	>
		Previous
	</Button>
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.nextPage()}
		disabled={!table.getCanNextPage()}
	>
		Next
	</Button>
</div>
