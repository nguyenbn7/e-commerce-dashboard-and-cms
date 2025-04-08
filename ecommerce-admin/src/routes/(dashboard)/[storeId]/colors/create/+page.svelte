<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ColorForm } from '$features/colors/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create Color" />

<Heading title="Create Color" description="Add a new color" />

<Separator />

<ColorForm createForm form={data.form} />

<Separator />
