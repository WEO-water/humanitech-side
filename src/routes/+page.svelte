<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let {data} = $props() // Receives `paramValue` from `+page.js`
    let fetchedData = null;
    let paramValue = null;
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      paramValue = urlParams.get("name") || "No name provided";
    });
  
    // Fetch data from external URL
    var chart_data = [30, 86, 168, 281, 303, 365];
    
    let el = $state();

    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      let firstParam = urlParams.get("first");
      let data_point = 0
      if(firstParam != null){
        data_point = parseInt(firstParam);
      }
      chart_data.push(data_point)
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
  
  <h1>Hello, {paramValue}!</h1>
  <p>Fetched Data:</p>
  <pre>{fetchedData}</pre>
  