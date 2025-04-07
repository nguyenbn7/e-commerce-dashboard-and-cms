<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { SizeForm } from '$features/sizes/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create Size" />

<Heading title="Create Size" description="Add a new size" />

<Separator />

<SizeForm createForm form={data.form} />

<Separator />
