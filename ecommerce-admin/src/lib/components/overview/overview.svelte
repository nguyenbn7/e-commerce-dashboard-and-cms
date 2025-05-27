<script lang="ts">
	import { formatter } from '$lib/currency';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	interface Props {
		data: { name: string; total: number }[];
	}

	const { data }: Props = $props();

	let chartEl: HTMLCanvasElement;

	onMount(() => {
		new Chart(chartEl, {
			type: 'bar',
			data: {
				labels: data.map((d) => d.name),
				datasets: [
					{
						data: data.map((d) => d.total / 100),
						borderColor: '#888888',
						backgroundColor: '#3498db',
						borderRadius: {
							topLeft: 4,
							topRight: 4,
							bottomLeft: 0,
							bottomRight: 0
						}
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				font: {
					size: 12
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						callbacks: {
							label(tooltipItem) {
								const { parsed } = tooltipItem;
								return `${formatter.format(parsed.y)}`;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							callback(tickValue, index, ticks) {
								return formatter.format(tickValue as number);
							}
						}
					}
				}
			}
		});
	});
</script>

<div class="w-full h-[350px]">
	<canvas bind:this={chartEl}></canvas>
</div>
