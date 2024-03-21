
<script lang="ts">
  import Article from "$lib/Components/Article.svelte";

  export let data: { title: string, url: string };
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Article markdownURL={data.url} />