<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Badge, type BadgeVariant } from '$lib/components/ui/badge';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import Server from '@lucide/svelte/icons/server';
	import Copy from '@lucide/svelte/icons/copy';

	type Variant = 'public' | 'admin';
	interface Props {
		title: string;
		description: string;
		variant?: Variant;
	}

	const textMap: Record<Variant, 'Public' | 'Admin'> = {
		public: 'Public',
		admin: 'Admin'
	};

	const variantMap: Record<Variant, BadgeVariant> = {
		public: 'secondary',
		admin: 'destructive'
	};

	let { title, description, variant = 'public' }: Props = $props();

	async function onCopy(description: string) {
		await navigator.clipboard.writeText(description);
		toast.success('API route copied to the clipboard');
	}
</script>

<Alert>
	<Server class="size-4" />

	<AlertTitle class="flex items-center gap-x-2">
		{title}
		<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
	</AlertTitle>

	<AlertDescription class="mt-4 flex items-center justify-between">
		<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
			{description}
		</code>

		<Button variant="secondary" size="icon" onclick={() => onCopy(description)}>
			<Copy class="size-4" />
		</Button>
	</AlertDescription>
</Alert>
