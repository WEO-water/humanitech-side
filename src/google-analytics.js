import { onMount } from 'svelte';

export const initGA = () => {
  onMount(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-Q1DJ2PSRQ5');
  });
};
