<script>
    
    import { onMount } from 'svelte';
    import { Felt } from "@feltmaps/js-sdk";

    let el = $state();

    onMount(async () => {
        const map = await Felt.embed(
        el,
        "pTqWyHI9AQy9BX8h0iMUyhCA",
        );
        const layers = await map.getLayers();
        const elements = await map.getElements();
    })
</script>

<div bind:this={el} class="h-screen"></div>