<script>
    
    import { onMount } from 'svelte';
    import { Felt } from "@feltmaps/js-sdk";
    import { initGA } from '../../google-analytics.js';

    // Initialize Google Analytics
    initGA();

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