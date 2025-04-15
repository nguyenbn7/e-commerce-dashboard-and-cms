<script lang="ts" module>
	let promise: { resolve: (value: boolean) => void } | null = $state(null);

	let autoOpen = $state(false);
	var titleFromFunction = $state('');
	var descriptionFromFunction = $state('');

	type Options = {
		title?: string;
		description?: string;
		autoOpen?: boolean;
	};

	export async function confirm(
		options: Options = {
			title: '',
			description: '',
			autoOpen: true
		}
	) {
		titleFromFunction = options.title ?? '';
		descriptionFromFunction = options.description ?? '';
		autoOpen = options.autoOpen === undefined ? true : options.autoOpen;

		return new Promise<boolean | null>((resolve, reject) => {
			promise = { resolve };
		});
	}
</script>

<script lang="ts">
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
	}

	let { open = $bindable(false), title = '', description = '' }: Props = $props();

	const handleClose = () => {
		promise = null;
		autoOpen = false;
		open = false;
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

	let dialogTitle = $derived(titleFromFunction || title || 'Are you absolutely sure?');
	let dialogDescription = $derived(
		descriptionFromFunction ||
			description ||
			'This action cannot be undone. This will permanently delete your data.'
	);

	$effect(() => {
		if (autoOpen && !open) open = true;
	});
</script>

<AlertDialog bind:open>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>
				{dialogTitle}
			</AlertDialogTitle>
			<AlertDialogDescription>
				{dialogDescription}
			</AlertDialogDescription>
		</AlertDialogHeader>

		<AlertDialogFooter>
			<AlertDialogCancel onclick={handleCancel}>Cancel</AlertDialogCancel>
			<AlertDialogAction onclick={handleConfirm}>Continue</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
