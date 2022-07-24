<template>
  <div class="flex w-full justify-center" v-if="loading">
    <svg
      class="w-16 -mr-8 text-blue-500"
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 0 0"
      xml:space="preserve"
    >
      <circle class="fill-current" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle
        class="fill-current"
        fill="#fff"
        stroke="none"
        cx="26"
        cy="50"
        r="6"
      >
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle
        class="fill-current"
        fill="#fff"
        stroke="none"
        cx="46"
        cy="50"
        r="6"
      >
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  </div>
  <VueApexCharts
    v-if="series.length"
    class="max-w-2xl px-4 flex w-full m-auto"
    type="bar"
    :options="options"
    :series="series"
  ></VueApexCharts>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ref as reference, onValue } from "firebase/database";
import VueApexCharts from "vue3-apexcharts";
import db from "../db/db";
import { endpoints } from "../models/endpoints";
// import { WillhabenService } from "../services/WillhabenService";

export default {
  name: "WillhabenChart",
  props: [],
  components: {
    VueApexCharts,
  },
  setup() {
    const loading = ref(true);
    const options = ref({
      chart: {
        id: "willhaben",
        width: "100%",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "90%",
        },
      },
      dataLabels: {
        enabled: true,
        distributed: true,
        style: {
          fontSize: "12px",
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontWeight: "400",
        },
      },
      colors: [
        "#f94144",
        "#f3722c",
        "#f8961e",
        "#f9844a",
        "#f9c74f",
        "#90be6d",
        "#43aa8b",
        "#4d908e",
        "#94d2bd",
        "#ef476f",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
      ],
    });
    const series = ref([]);

    const onUpdateChart = () => {
      onValue(reference(db), (snapshot) => {
        const data = snapshot.val();
        loading.value = false;

        let _categories = [];
        let _series = [];

        const years = Object.keys(data);

        endpoints.map((endpoint, index) => {
          let tmp = {};
          let tmpData = [];
          tmp.name = endpoint.title;

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
          if (endpoint.title !== "Giwog") {
            _series.push(tmp);
          }
        });

        series.value = _series;
        options.value = {
          ...options.value,
          ...{
            xaxis: {
              labels: {
                format: "dd/MM",
              },
              categories: _categories,
            },
          },
        };
      });
    };

    onMounted(async () => {
      onUpdateChart();
    });

    return { loading, options, series };
  },
};
</script>
