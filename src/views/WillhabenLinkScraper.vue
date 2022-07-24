<template>
  <article class="prose max-w-none mt-12 mx-auto">
    <h1>Link Scraper</h1>
    <p>Enter a valid link, hover over the link and get ready for sUrPrIsE...</p>
    <p>
      <ul>
        <!-- render LinkPreviewer component for each demolink -->
        <li v-for="link in demoLinks" :key="link">
          <link-previewer :targetURL="link" />
        </li>
      </ul>
    </p>
    
    <!-- input field to add new links -->
    <p><input
      class="p-2 ring ring-blue-600 rounded-lg shadow-md w-2/3 text-center"
      type="url"
      @keyup.enter="addLink"
      required
      placeholder="enter valid url"
    /></p>
  </article>
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
