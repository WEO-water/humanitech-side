<script>
    import { onMount } from 'svelte';
  
    export let data; // Receives `paramValue` from `+page.js`
    let fetchedData = null;
  
    // Fetch data from external URL
    
  </script>
  
  <h1>Hello, {data.paramValue}!</h1>
  <p>Fetched Data:</p>
  <pre>{fetchedData}</pre>
  