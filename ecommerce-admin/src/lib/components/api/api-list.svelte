<script lang="ts">
	import { page } from '$app/state';
	import ApiAlert from './api-alert.svelte';

	interface Props {
		entityName: string;
		entityIdName: string;
	}

	let { entityName, entityIdName }: Props = $props();

	const baseUrl = `${page.url.origin}/api/stores/${page.params.storeId}`;
</script>

<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
<ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
<ApiAlert title="PUT" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
<ApiAlert
	title="DELETE"
	variant="admin"
	description={`${baseUrl}/${entityName}/{${entityIdName}}`}
/>
