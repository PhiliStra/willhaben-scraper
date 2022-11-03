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

    setup() {
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
                // smooth: true,
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