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
</template>
<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import WillhabenService from "../services/WillhabenService";
import endpoints from "../models/endpoints";

export default {
  name: "WillhabenUpdate",
  props: [],
  setup() {
    const loading = ref(true);
    const results = ref({});

    const getWillhabenStats = async () => {
      let _results = {};
      Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const res = await fetch("/.netlify/functions/willhaben-stats/", {
              method: "POST",
              body: JSON.stringify({
                title: endpoint.title,
                url: endpoint.url,
              }),
            });

            const data = await res.json();
            _results[data.title] = data.description;
          } catch (err) {
            console.log(err);
            return null;
          }
        })
      ).then(async () => {
        await WillhabenService.create(_results)
          .then(() => {
            console.log("Created new item successfully!", _results);
          })
          .catch((e) => {
            console.log(e);
          });

        loading.value = false;
        results.value = _results;
      });
    };

    onBeforeMount(async () => {
      getWillhabenStats();
    });

    return { results, loading };
  },
};
</script>
