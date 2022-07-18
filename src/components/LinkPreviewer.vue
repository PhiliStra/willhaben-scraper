<template>
  <div class="inline relative">
    <!-- display targetURL link -->
    <a
      class="link underline text-blue-600"
      :href="targetURL"
      :target="previewData ? previewData.title : '_blank'"
    >
      {{ targetURL }}
    </a>
    <!-- display preview data if object exists -->
    <div
      v-if="previewData"
      class="
        result-preview
        absolute
        top-8
        left-0
        transform
        translate-y-4
        opacity-0
        invisible
        transition
        bg-white
        overflow-hidden
        rounded-md
        shadow-lg
        z-10
        w-full
      "
    >
      <!-- display title and description -->
      <div class="details p-4 text-left bg-blue-400 text-white">
        <div class="flex justify-center" v-if="loading">
          <svg
            class="w-16 -mr-8"
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
            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"
              />
            </circle>
            <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2"
              />
            </circle>
            <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
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
        <h1 class="font-extrabold text-xl text-center">
          {{ previewData.title }}
        </h1>
        <p class="text-center">{{ previewData.description }}</p>
      </div>
      <img
        v-if="previewData.screenshot"
        :src="`data:image/jpeg;base64,${previewData.screenshot}`"
        :alt="previewData.description"
        width="800"
        height="600"
      />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";

export default {
  // define targetURL as a prop
  props: ["targetURL"],

  setup(props) {
    // create a reactive previewData object using ref
    const previewData = ref({});
    const loading = ref(true);

    // function to send a POST request containing the targetURL to the serverless function
    const generatePreview = async () => {
      try {
        const res = await fetch("/api/generate-preview/generate-preview.js", {
          method: "POST",
          body: JSON.stringify({
            title: "Mietwohnungen",
            targetURL: props.targetURL,
          }),
        });

        const data = await res.json();
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    const getWillhabenStats = async () => {
      try {
        const res = await fetch("/.netlify/functions/willhaben-stats/", {
          method: "POST",
          body: JSON.stringify({
            title: "Mietwohnungen Linz",
            url: props.targetURL,
          }),
        });

        const data = await res.json();
        console.info(data);
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    // run function before component is mounted
    onBeforeMount(async () => {
      // await getWillhabenStats();
      // run generatePreview() to get the preview data and assign to previewData
      // previewData.value = await generatePreview();
      previewData.value = await getWillhabenStats();
      loading.value = false;
      
      console.log(previewData);
      // use object destructuring to get the different descriptions from the preview data
      // const { desc, og, twitter } = previewData.value.descriptions;
      // assign only one valid value to the description property in the previewData object
      // previewData.value.description = desc || og || twitter || "";
    });

    // make the following entities available to the component
    return { getWillhabenStats, generatePreview, previewData, loading };
  },
};
</script>

<style scoped>
.link:hover ~ .result-preview {
  @apply visible opacity-100 translate-y-0;
}
.loading {
  width: 600px;
}
</style>
