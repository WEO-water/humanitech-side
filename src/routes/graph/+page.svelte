<script>
    import { Alert,  Chart,  } from 'flowbite-svelte';
    import { InfoCircleSolid, ArrowUpOutline, ArrowDownOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    let name = $state("...");
    let chartData = $state([])
    let chartLSTNightData = $state([] )
    let chartLSTDayData = $state([] )
    let data_point = $state(0)
    let lst_day_current = $state(0)
    let lst_night_current = $state(0)
    let change_lst = $derived(chartLSTDayData[chartLSTDayData.length -1]- chartLSTDayData[0])
    let heat_risk = $derived.by(() => {
      let current_lst_day = chartLSTDayData[chartLSTDayData.length -1];
      let current_lst_night = chartLSTNightData[chartLSTNightData.length -1];
      if(current_lst_day>40 || current_lst_night>30){
        return 1;
      }
      if(current_lst_day>35 || current_lst_night>23){
        return 2;
      }
      if(current_lst_day>30 || current_lst_night>20){
        return 3;
      }
      return 4;
	  });
    onMount(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let valuesParam = urlParams.get("values") || ""; // Format comma separated values
      let nameBase64 = urlParams.get("nameBase64") || "";
      if(nameBase64){
        name = atob(nameBase64)
      }else{
        name = ""
      }
      chartData = valuesParam.split(",").map(num => parseFloat(num.trim()).toFixed(2));
      let lstDayParam = urlParams.get("lst_day") || ""; // Format comma separated values
      chartLSTDayData = lstDayParam.split(",").map(num => parseFloat(num.trim()).toFixed(2));
      let valuesLSTNightParam = urlParams.get("lst_night") || ""; // Format comma separated values
      chartLSTNightData = valuesLSTNightParam.split(",").map(num => parseFloat(num.trim()).toFixed(2));
      data_point = 0
      if(chartData != null){
        data_point = parseInt(chartData[chartData.length - 1]);
      }
      lst_night_current = parseInt(chartLSTNightData[chartLSTNightData.length - 1]);
      lst_day_current = parseInt(chartLSTDayData[chartLSTDayData.length - 1]);
      name = urlParams.get("name") || "";
    })
    let options = $derived({
      chart: {
        height: '400px',
        maxWidth: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      tooltip: {
        enabled: true,
        x: {
          show: false
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2']
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 6
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        }
      },
      series: [
      {
        name: 'LST Day',
        data: chartLSTDayData,
        color: '#1A56DB'
      },
      {
        name: 'LST NIght',
        data: chartLSTNightData,
        color: '#7E3AF2'
      },
    ],
    xaxis: {
        categories: ['December 24', 'January 25', 'February 25'],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + " °C"; // Adding postfix
          },
          style: {
            colors: "gray", // Change y-axis label color
            fontSize: "12px",
          }
        }
      }
    });
  </script>
  
  <div class="m-1">
    <div class="border-b border-gray-200 pb-5 mb-5">
      <h3 class="text-base font-semibold text-gray-50">{name}</h3>
    </div>
    {#if heat_risk < 3}
      <Alert  class="items-start! " rounded={false}>
        <span slot="icon">
          <InfoCircleSolid class="w-5 h-5" />
          <span class="sr-only">Heat risk</span>
        </span>
        This zone has a high heat risk and increased risk for heatstroke or heat exhaustion. If you live in this area seek advice from local authorities.<br>
        <p class="mt-1.5 font-medium">Possible solutions:</p>
        <ul class="mt-1.5 ms-4 list-disc list-inside">
          <li>Plant trees</li>
          <li>Implement green roofs</li>
        </ul>
        <p class="mt-1.5 font-medium">Prevention of heatstrokes or heat exhaustion:</p>
        <ul class="mt-1.5 ms-4 list-disc list-inside">
          <li>Seek cool or shady areas</li>
          <li>Drink water</li>
          <li>Take cold showers</li>
        </ul>
        <p class="mt-1.5 font-medium">In case fo these symptoms call the emergency services:</p>
        <ul class="mt-1.5 ms-4 list-disc list-inside">
          <li>nausea</li>
          <li>muscle spasms
          <li>pain throughout the body
          <li>unusual behaviour or signs of confusion
          <li>seizure or possible loss of responsiveness
        </ul>
      </Alert>
    {/if}
    <div class="flex justify-between mt-5">
      
      <div class="grid gap-4 grid-cols-2">
        <div>
          <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
            LST Day
            
          </h5>
          <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">{lst_day_current}°C</p>
        </div>
        <div>
          <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
            LST Night
            
          </h5>
          <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">{lst_night_current}°C</p>
        </div>
      </div>
      <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
        {#if change_lst <= 0}
        <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          <ArrowDownOutline class="w-2.5 h-2.5 me-1.5" />
          {change_lst}°C
        </span>
        {:else}
        <span class="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-red-900 dark:text-red-300">
          <ArrowUpOutline class="w-2.5 h-2.5 me-1.5" />
          {change_lst}°C
        </span>
        {/if}
      </div>
    </div>
    <Chart {options} />
  </div>