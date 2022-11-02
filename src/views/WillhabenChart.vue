<template>
  <article class="prose-sm md:prose mt-4 md:mt-12 max-w-none">
    <h1 id="willhaben-wohnungsmarkt-oö">Willhaben Wohnungsmarkt OÖ</h1>
    <section class="button-group hidden">
      <button class="button button-active" @click="
        setChart({
          stackType: '',
          type: 'bar',
        })
      ">
        Absolute</button><button class="button" @click="
          setChart({
            stackType: '100%',
            type: 'line',
          })
        ">
        Percentage
      </button>
    </section>
    <div class="grid lg:grid-cols-2 gap-4 md:gap-8 w-full">
      <section>
        <h2 id="miet-und-eigentumswohnungen">Miet- und Eigentumswohnungen</h2>
        <div class="mt-8 pr-4 md:pr-0">
          <WillhabenFadeTransition>
            <div class="flex w-full justify-center h-80 p-24" v-if="loading">
              <WillhabenLineChartLoader />
            </div>
            <div v-else ref="vChartContainer" v-resize="onEChartResize" class="w-full"
              :style="{ height: chartHeight + 'px' }">
              <v-chart id="mietundeigentum" ref="vChart" :option="echartOptions" />
            </div>
          </WillhabenFadeTransition>
        </div>
      </section>
      <section>
        <h2 id="genossenschaftswohnungen">Genossenschaftswohnungen</h2>
        <div class="mt-8 pr-4 md:pr-0">
          <WillhabenFadeTransition>
            <div class="flex w-full justify-center h-80 p-24" v-if="loading">
              <WillhabenLineChartLoader />
            </div>
            <div v-else ref="vChartCommunityContainer" v-resize="onEChartCommunityResize" class="w-full"
              :style="{ height: chartHeight + 'px' }">
              <v-chart id="genossenschaft" ref="vChartCommunity" :option="echartOptionsCommunity" />
            </div>
          </WillhabenFadeTransition>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ref as reference, onValue } from "firebase/database";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY, INIT_OPTIONS_KEY } from "vue-echarts";
import WillhabenLineChartLoader from '../components/WillhabenLineChartLoader.vue'
import WillhabenFadeTransition from '../components/WillhabenFadeTransition.vue'

import db from "../db/db";
import { endpoints } from "../models/endpoints";
import essos from "../assets/essos.json";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  name: "WillhabenChart",
  props: [],
  components: {
    VChart,
    WillhabenLineChartLoader,
    WillhabenFadeTransition
  },
  provide: {
    [THEME_KEY]: essos,
    [INIT_OPTIONS_KEY]: { opts: { renderer: "svg" } },
  },
  setup() {
    const loading = ref(true);
    const series = ref([]);
    const seriesCommunity = ref([]);
    const chartHeight = ref(0);

    const vChartContainer = ref(0);
    const vChart = ref(null);
    const vChartCommunityContainer = ref(0);
    const vChartCommunity = ref(null);
    const echartSize = ref({ width: 1280, height: 800 });
    const echartSizeCommunity = ref({ width: 1280, height: 800 });
    const echartOptionsCommunity = ref({
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
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      series: [],
    });
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
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      series: [],
    });

    const onUpdateChart = () => {
      onValue(reference(db), (snapshot) => {
        const data = snapshot.val();
        loading.value = false;

        let _categories = [];
        let _series = [];
        let _seriesCommunity = [];

        const years = Object.keys(data);

        endpoints.map((endpoint, index) => {
          let tmp = {};
          let tmpData = [];
          tmp.name = endpoint.title;
          tmp.type = "line";
          // tmp.stack = "Total";
          tmp.smooth = true;
          tmp.label = {
            show: true,
          };
          tmp.emphasis = {
            focus: "series",
          };

          years.map((year) => {
            Object.keys(data[year]).map((month) => {
              Object.keys(data[year][month]).map((day) => {
                if (index === 0) _categories.push(`${month}/${day}/${year}`);
                Object.entries(data[year][month][day]["7"]).map((item) => {
                  if (item[0] === endpoint.title) {
                    tmpData.push(parseFloat(item[1]));
                  }
                });
              });
            });
          });
          tmp.data = tmpData;

          if (
            (endpoint.title === "Mietwohnungen in L_nz" ||
              endpoint.title === "Eigentumswohnungen in L_nz") &&
            tmp.data[1] > 0
          ) {
            _series.push(tmp);
          } else if (
            (endpoint.title !== "Mietwohnungen in L_nz" ||
              endpoint.title !== "Eigentumswohnungen in L_nz") &&
            tmp.data[1] > 0
          ) {
            _seriesCommunity.push(tmp);
          }
        });

        // chartHeight.value = _categories.length * 44;
        chartHeight.value = 320;

        let max = 0;
        let min = 0;

        _series.forEach(serie => {
          let maxTmp = Math.max(...serie.data);
          let minTmp = Math.min(...serie.data);

          if (maxTmp > max) {
            max = maxTmp;
          }

          if (minTmp < max) {
            min = minTmp;
          }
        })

        series.value = _series;
        seriesCommunity.value = _seriesCommunity;

        echartOptions.value = {
          ...echartOptions.value,
          ...{
            xAxis: {
              type: "category",
              data: _categories,
            },
            yAxis: {
              min: min - 10,
              max: max + 10
            },
            series: _series,
          },
        };

        echartOptionsCommunity.value = {
          ...echartOptionsCommunity.value,
          ...{
            legend: { type: "scroll" },
            xAxis: {
              type: "category",
              data: _categories,
            },
            series: _seriesCommunity,
          },
        };
      });
    };

    const onEChartResize = ({ width, height }) => {
      vChart.value.resize(width, height);
    };

    const onEChartCommunityResize = ({ width, height }) => {
      vChartCommunity.value.resize(width, height);
    };

    onMounted(async () => {
      onUpdateChart();
    });

    return {
      loading,
      chartHeight,
      onEChartResize,
      onEChartCommunityResize,
      vChartContainer,
      vChart,
      vChartCommunityContainer,
      vChartCommunity,
      echartSize,
      echartSizeCommunity,
      echartOptions,
      echartOptionsCommunity,
      series,
      seriesCommunity,
    };
  },
};
</script>
<style lang="scss" scoped>
.button-group {
  @apply inline-flex bg-gray-100 rounded-lg overflow-hidden;
}

.button {
  @apply px-4 py-3;

  &-active,
  &:hover {
    @apply bg-gray-200;
  }
}
</style>
