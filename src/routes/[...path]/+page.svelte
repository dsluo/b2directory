<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: files = data.s3Response.Contents;

	console.log(data);
</script>

<h1>hello world</h1>

<p>{$page.params.path}</p>

<ul>
	{#each files as file}
		<li>{file.Key}</li>
	{/each}
</ul>
