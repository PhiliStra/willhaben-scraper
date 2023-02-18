<template>
    <v-chart class="filter grayscale opacity-30 pointer-events-none" :option="echartOptions" />
</template>
<script>
import { ref } from "@vue/reactivity";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { onBeforeMount } from 'vue-demi';

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
]);

export default {
    name: "WillhabenLineChartSkeleton",
    components: {
        VChart,
    },

    props: {
        lines: {
            type: Number,
            default: 1
        },
        days: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 10
        },
    },
    setup(props) {
        const getRandomNumber = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        onBeforeMount(() => {
            let categories = [];
            let series = [];

            for (let j = 0; j < props.lines; j++) {
                for (let i = 0; i < props.days; i++) {
                    categories.push(i)
                    series.push(getRandomNumber(props.min, props.max));
                }
            }

            echartOptions.value.yAxis.min = parseInt(props.min) - 10;
            echartOptions.value.yAxis.max = parseInt(props.max) + 10;
            echartOptions.value.xAxis.data = categories;
            echartOptions.value.series.data = series;
        })

        const echartOptions = ref({
            autoresize: true,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            yAxis: {
                type: "value",
                min: 300,
                max: 400
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            series: {
                type: 'line',
                smooth: true,
                emphasis: { fcous: 'series' },
                data: [348, 357, 340, 377, 362, 340, 355]
            },
        });
        return {
            echartOptions
        }
    }
}

</script>