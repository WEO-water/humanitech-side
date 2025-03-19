<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let {data} = $props() // Receives `paramValue` from `+page.js`
    let fetchedData = null;
  
    // Fetch data from external URL
    var chart_data = [data.first, 30, 86, 168, 281, 303, 365];
    
    let el = $state();

    onMount(() => {
      d3.select(el)
        .selectAll("div")
        .data(chart_data)
        .enter()
        .append("div")
        .style("width", function(d) {
          return d + "px";
        })
        .text(function(d) {
          return d;
        });
    });
  </script>

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>

<div bind:this={el} class="chart"></div>
  
  <h1>Hello, {data.name}!</h1>
  <p>Fetched Data:</p>
  <pre>{fetchedData}</pre>
  