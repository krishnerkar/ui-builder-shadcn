<script lang="ts">
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    
    export let data;
    let Component: any;
    
    onMount(async () => {
        try {
            const module = await import(
                `$lib/dynamic-components/${data.componentId}.svelte`
            );
            Component = module.default;
        } catch (e) {
            throw error(404, 'Component not found');
        }
    });
</script>

{#if Component}
    <svelte:component this={Component} />
{:else}
    <p>Loading component...</p>
{/if}
