<template>
  <article class="mt-12">
    <section class="prose-sm md:prose max-w-none mx-auto">
      <h1>Link Scraper</h1>
      <p>
        Enter a valid link, hover over the link and get ready for sUrPrIsE...
      </p>
    </section>
    <section class="mt-8">
      <ul class="space-y-1">
        <!-- render LinkPreviewer component for each demolink -->
        <li class="font-bold hover:underline" v-for="link in demoLinks" :key="link">
          <link-previewer :targetURL="link" />
        </li>
      </ul>

      <!-- input field to add new links -->
      <input
        class="w-full md:w-2/3 mt-6 p-2 focus:outline-none focus-visible:ring focus-visible:ring-gray-600 rounded-lg shadow text-center"
        type="url" @keyup.enter="addLink" required placeholder="enter valid url" />
    </section>
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
      "https://www.willhaben.at/iad/immobilien/eigentumswohnung/oberoesterreich/linz",
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
