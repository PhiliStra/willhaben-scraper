<template>
  <div class="flex w-full p-4 justify-center" v-if="loading">
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
  <apexchart
    class="max-w-2xl px-4 flex w-full m-auto"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ref as reference, onValue } from "firebase/database";
import db from "../db/db";
// import { WillhabenService } from "../services/WillhabenService";

export default {
  name: "WillhabenChart",
  props: [],
  setup() {
    const loading = ref(true);
    const options = ref({
      chart: {
        id: "willhaben",
        width: "100%",
        stacked: true,
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

        // console.log(data);

        const _year = Object.keys(data);
        const _month = Object.keys(data[_year]);
        const _days = Object.keys(data[_year][_month]);
        const _keys = Object.keys(data[_year][_month]["22"]["0"]);
        // const _hours = Object.keys(data[_year][_month]["21"]);

        /* _hours.map((category) => {
          _categories.push(`21/7/2022/${category}`);
        }); */

        _days.map((category) => {
          _categories.push(`7/${category}/2022`);
        });

        console.log(_days);

        _keys.map((key) => {
          let _tmp = {};
          let _tmpData = [];
          _tmp.name = key;

          // console.log(key);

          _days.map((category) => {
            Object.entries(data["2022"]["7"][category]["0"]).map((item) => {
              if (item[0] === key) {
                // console.log(item[1]);
                _tmpData.push(parseFloat(item[1]));
              }
            });
          });
          _tmp.data = _tmpData;
          if (key !== "Giwog") {
            _series.push(_tmp);
          }
        });

        series.value = _series;

        options.value = {
          ...options.value,
          ...{
            xaxis: {
              type: "datetime",
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
