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
import { onBeforeMount } from "@vue/runtime-core";

export default {
  props: [],
  data: function () {
    return {
      options: {
        chart: {
          id: "willhaben",
          width: "100%",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "07/16/2022",
            "07/17/2022",
            "07/18/2022",
            "07/19/2022",
            "07/20/2022",
            "07/21/2022",
            "07/22/2022",
            "07/23/2022",
          ],
        },
      },
      series: [
        {
          name: "Mietwohnungen in Linz",
          data: [962, 970, 983, 990, 987, 990, 994, 1002],
        },
        {
          name: "Eigentumswohnungen in Linz",
          data: [930, 940, 945, 950, 949, 960, 970, 991],
        },
      ],
    };
  },
  setup() {
    const loading = ref(true);
    const results = ref({});

    onBeforeMount(async () => {});

    return { results, loading };
  },
};
</script>
