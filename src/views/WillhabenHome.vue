<template>
  <main class="home">
    <ul class="mb-4">
      <!-- render LinkPreviewer component for each demolink -->
      <li v-for="link in demoLinks" :key="link">
        <link-previewer :targetURL="link" />
      </li>
    </ul>
    <!-- input field to add new links -->
    <input
      class="p-2 ring ring-blue-600 rounded-lg shadow-md w-2/3 text-center"
      type="url"
      @keyup.enter="addLink"
      required
      placeholder="enter valid url"
    />
  </main>
</template>

<script>
import { ref } from "@vue/reactivity";
import LinkPreviewer from "../components/LinkPreviewer.vue";

export default {
  name: "WillhabenHome",
  components: { LinkPreviewer },
  setup() {
    const demoLinks = ref([
      "https://www.willhaben.at/iad/immobilien/mietwohnungen/oberoesterreich/linz",
    ]);

    // function to add new links to the demoLinks array
    const addLink = ({ target }) => {
      demoLinks.value.push(target.value);
      target.value = "";
    };

    return { demoLinks, addLink };
  },
};
</script>
