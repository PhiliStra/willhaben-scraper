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

export default {
  props: [],
  setup() {
    const endpoints = [
      {
        title: "Mietwohnungen In Linz",
        url: "https://www.willhaben.at/iad/immobilien/mietwohnungen/oberoesterreich/linz",
      },
      {
        title: "Eigentumswohnungenwohnungen in Linz",
        url: "https://www.willhaben.at/iad/immobilien/eigentumswohnung/oberoesterreich/linz",
      },
      {
        title: "OÖ Wohnbau",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=37441909&verticalId=2",
      },
      {
        title: "WSG",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=29720423&verticalId=2",
      },
      {
        title: "GWG Linz",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=28446133&verticalId=2",
      },
      {
        title: "Lawog",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=17103067&verticalId=2",
      },
      {
        title: "EBS",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=7091459&verticalId=2",
      },
      {
        title: "GIWOG",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6912138&verticalId=2",
      },
      {
        title: "Wohnbau 200",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6912076&verticalId=2",
      },
      {
        title: "Neue Heimat",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6563419&verticalId=2",
      },
      {
        title: "Familie",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=37609411&verticalId=2",
      },
      {
        title: "Lebensräume",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6563410&verticalId=2",
      },
      {
        title: "BRW",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6556903&verticalId=2",
      },
      {
        title: "WAG",
        url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6556872&verticalId=2",
      },
    ];

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
        /* try {
          await fetch("/.netlify/functions/willhaben-database/", {
            method: "POST",
            body: JSON.stringify(_results),
          });
        } catch (err) {
          console.log(err);
          return null;
        }*/

        await WillhabenService.create(_results)
          .then(() => {
            console.log("Created new item successfully!", _results);
          })
          .catch((e) => {
            console.log(e);
          });

        // await WillhabenService.getChildren(`/2022/07`);

        // writeResults(results);
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
