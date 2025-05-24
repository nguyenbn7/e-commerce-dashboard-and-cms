<script lang="ts">
	import type { getProduct } from '$features/products/server/repository';
	import type { z } from 'zod';

	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		FormControl,
		FormDescription,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';

	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';

	import { Form } from '$lib/components/form';
	import { ImageUpload } from '$lib/components/image';

	import { locales, options } from '$lib/currency';

	import { ColorDisplay } from '$features/colors/components';
	import { productFormSchema } from '$features/products/schemas';

	interface Props {
		disabled?: boolean;
		createForm?: boolean;
		initData?: Awaited<ReturnType<typeof getProduct>>;
		onSubmit: (values: z.infer<typeof productFormSchema>) => void;
		categories: { id: string; name: string }[];
		sizes: { id: string; name: string }[];
		colors: { id: string; name: string; value: string }[];
	}

	let {
		disabled: _disabled = false,
		createForm,
		categories,
		sizes,
		colors,
		onSubmit,
		initData
	}: Props = $props();

	const form = superForm(
		initData ? defaults(initData, zod(productFormSchema)) : defaults(zod(productFormSchema)),
		{
			id: `product_${Math.floor(Math.random() * Date.now()).toString(16)}`,
			dataType: 'json',
			SPA: true,
			validators: zodClient(productFormSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data);
				}
			}
		}
	);

	const { form: formData } = form;

	let selectedColor = $derived(colors.find((c) => c.id === $formData.colorId));

	$effect(() => {
		if (!createForm && initData) {
			formData.set(initData);
		}
	});
</script>

<Form {form} disabled={_disabled} {createForm}>
	{#snippet content({ disabled })}
		<FormField {form} name="images">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Images</FormLabel>

					<ImageUpload
						class="mt-2"
						value={$formData.images.map((image) => image.url)}
						onChange={(url) => ($formData.images = [...$formData.images, { url }])}
						onRemove={(url) =>
							($formData.images = [...$formData.images.filter((current) => current.url !== url)])}
						{disabled}
					/>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>

		<div class="grid grid-cols-3 gap-8">
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Name</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Product name"
							class="mt-2"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="price">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Price</FormLabel>

						<Input
							{...props}
							{disabled}
							type="currency"
							placeholder="9.99"
							{locales}
							{options}
							class="mt-2"
							bind:value={$formData.price}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="categoryId">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Category</FormLabel>

						<Select type="single" {disabled} name={props.name} bind:value={$formData.categoryId}>
							<SelectTrigger {...props} class="mt-2">
								{categories.find((c) => c.id === $formData.categoryId)?.name ?? 'Select a category'}
							</SelectTrigger>

							<SelectContent>
								{#each categories as category (category.id)}
									<SelectItem value={category.id.toString()}>
										{category.name}
									</SelectItem>
								{/each}
							</SelectContent>
						</Select>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="sizeId">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Size</FormLabel>

						<Select type="single" {disabled} name={props.name} bind:value={$formData.sizeId}>
							<SelectTrigger {...props} class="mt-2">
								{sizes.find((s) => s.id === $formData.sizeId)?.name ?? 'Select a size'}
							</SelectTrigger>

							<SelectContent>
								{#each sizes as size (size.id)}
									<SelectItem value={size.id.toString()}>
										{size.name}
									</SelectItem>
								{/each}
							</SelectContent>
						</Select>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="colorId">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Color</FormLabel>

						<Select type="single" {disabled} name={props.name} bind:value={$formData.colorId}>
							<SelectTrigger {...props} class="mt-2">
								{selectedColor?.name ?? 'Select a color'}
								{#if selectedColor}
									<span class="ml-2">
										<ColorDisplay colorValue={selectedColor.value} colorOnly />
									</span>
								{/if}
							</SelectTrigger>

							<SelectContent>
								{#each colors as color (color.id)}
									<SelectItem value={color.id.toString()}>
										{color.name}
										<span class="ml-2">
											<ColorDisplay colorValue={color.value} colorOnly />
										</span>
									</SelectItem>
								{/each}
							</SelectContent>
						</Select>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField
				{form}
				name="isFeatured"
				class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
			>
				<FormControl>
					{#snippet children({ props })}
						<Checkbox bind:checked={$formData.isFeatured} />
						<div class="space-y-1 leading-none">
							<FormLabel>Featured</FormLabel>
							<FormDescription>This product will appear on the home page.</FormDescription>
						</div>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField
				{form}
				name="isArchived"
				class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
			>
				<FormControl>
					{#snippet children({ props })}
						<Checkbox bind:checked={$formData.isArchived} />
						<div class="space-y-1 leading-none">
							<FormLabel>Archived</FormLabel>
							<FormDescription>This product will not appear anywhere in the store.</FormDescription>
						</div>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>
	{/snippet}
</Form>
