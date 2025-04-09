<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ProductForm } from '$features/products/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create product" />

<Heading title="Create product" description="Add a new product" />

<Separator />

<ProductForm form={data.form} createForm />

<Separator />
