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
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import { ref as reference, onValue } from "firebase/database";
import db from "../db/db";
// import { WillhabenService } from "../services/WillhabenService";

export default {
  name: "WillhabenChart",
  props: [],
  data: function () {
    return {
      options: {
        chart: {
          id: "willhaben",
          width: "100%",
        },
      },
      series: [],
    };
  },
  setup() {
    const loading = ref(true);
    const results = ref({});

    onBeforeMount(async () => {});
    onMounted(async () => {
      // await WillhabenService.fuckYou();
    });

    return { results, loading };
  },
  methods: {
    onUpdateChart() {
      onValue(reference(db), (snapshot) => {
        const data = snapshot.val();
        this.loading = false;

        let _categories = [];
        let _series = [];

        // console.log(data);

        /* const _year = Object.keys(data);
        const _month = Object.keys(data[_year]);
        const _day = Object.keys(data[_year][_month][21]); */
        const _keys = Object.keys(data["2022"]["7"]["21"]["12"]);
        const _hours = Object.keys(data["2022"]["7"]["21"]);

        _hours.map((category) => {
          _categories.push(`21/7/2022/${category}`);
        });

        _keys.map((key) => {
          let _tmp = {};
          let _tmpData = [];
          _tmp.name = key;

          // console.log(key);

          _hours.map((category) => {
            Object.entries(data["2022"]["7"]["21"][category]).map((item) => {
              if (item[0] === key) {
                console.log(item[1]);
                _tmpData.push(parseFloat(item[1]));
              }
            });
          });
          _tmp.data = _tmpData;
          if (
            key === "Mietwohnungen in L_nz" ||
            key === "Eigentumswohnungen in L_nz"
          ) {
            _series.push(_tmp);
          }
        });

        // console.log(_categories);

        this.series = _series;

        this.options = {
          ...this.options,
          ...{
            xaxis: {
              categories: _categories,
            },
          },
        };
      });
    },
  },
  created() {
    this.onUpdateChart();
  },
};
</script>
