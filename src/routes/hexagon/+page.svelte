<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';
	import * as params from '$lib/params';
	import RiskTable from '$lib/components/sidebar/RiskTable.svelte';

	let el = $state();
	let name = $state('...');
	let chartData = $state([]);
	let chartLSTNightData = $state([]);
	let chartLSTDayData = $state([]);
	let data_point = $state(0);
	let lst_day_current = $state(0);
	let lst_night_current = $state(0);
	let change_lst = $derived(chartLSTDayData[chartLSTDayData.length - 1] - chartLSTDayData[0]);
	let heat_risk = $derived.by(() => {
		let current_lst_day = chartLSTDayData[chartLSTDayData.length - 1];
		let current_lst_night = chartLSTNightData[chartLSTNightData.length - 1];
		if (current_lst_day > 40 || current_lst_night > 30) {
			return 1;
		}
		if (current_lst_day > 35 || current_lst_night > 23) {
			return 2;
		}
		if (current_lst_day > 30 || current_lst_night > 20) {
			return 3;
		}
		return 4;
	});

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		let valuesParam = urlParams.get('values') || ''; // Format comma separated values
		let nameBase64 = urlParams.get('nameBase64') || '';
		if (nameBase64) {
			name = atob(nameBase64);
		} else {
			name = '';
		}
		chartData = valuesParam.split(',').map((num) => parseFloat(num.trim()).toFixed(2));
		let lstDayParam = urlParams.get('lst_day') || ''; // Format comma separated values
		chartLSTDayData = lstDayParam.split(',').map((num) => parseFloat(num.trim()).toFixed(2));
		let valuesLSTNightParam = urlParams.get('lst_night') || ''; // Format comma separated values
		chartLSTNightData = valuesLSTNightParam
			.split(',')
			.map((num) => parseFloat(num.trim()).toFixed(2));
		data_point = 0;
		if (chartData != null) {
			data_point = parseInt(chartData[chartData.length - 1]);
		}
		lst_night_current = parseInt(chartLSTNightData[chartLSTNightData.length - 1]);
		lst_day_current = parseInt(chartLSTDayData[chartLSTDayData.length - 1]);

		// Initialize the echarts instance based on the prepared dom
		var myChart = echarts.init(el, 'dark');
		let option;

		option = {
            backgroundColor: '#1e2939',
			legend: {
				data: ['LST Day', 'LST Night'],
				top: '10%'
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['2024-12', '2025-01', '2025-02']
			},
			yAxis: {
				type: 'value',
				name: '°C',
				axisLabel: {
					formatter: '{value} °C'
				},
				show: false
			},
			series: [
				{
					name: 'LST Day',
					data: chartLSTDayData,
					type: 'line',
					smooth: true,
					areaStyle: {}
				},
				{
					name: 'LST Night',
					data: chartLSTNightData,
					type: 'line',
					smooth: true,
					areaStyle: {}
				}
			]
		};

		option && myChart.setOption(option);
	});
</script>

<div class="m-1">
	<div class="border-b border-gray-200 pb-5 mb-5">
		<h3 class="text-base font-semibold text-gray-50">{name}</h3>
	</div>
	<RiskTable fireRisk="High Risk" />
	<div bind:this={el} style="width: 300px;height:400px;"></div>
</div>
