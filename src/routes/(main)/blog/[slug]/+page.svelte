
<script lang="ts">
  /** @type {import('./$types').PageData}*/
  import Article  from "$lib/Article.svelte";

  export let data: { title: string, url: string };
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Article markdownURL={data.url} offsetTop={50} />