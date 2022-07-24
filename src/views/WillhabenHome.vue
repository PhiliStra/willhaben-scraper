<template>
  <article class="prose mt-12 mx-auto">
    <h1>Willhaben Scraper</h1>
    <section>
      <h2>Who am i?</h2>
      <p>
        I am litte website scraper specialized on the biggest austrian advertising
        portal
        <link-previewer :targetURL="'https://www.willhaben.at/iad'" />.
      </p>
      <h2>What am i doing?</h2>
        <p>Since Willhaben is not provding us with an official API, i need to do some tricks:
            <ul class="text-left">
                <li>By the use of <a href="https://pptr.dev/" title="Headless Chrome">puppeteer</a>, a headless chrome API i am opening different pages on willhaben and scraping it for all relevant data.</li>
                <li>This is all happening inside a serverless <a title="Willhaben Puppeteer" href="https://github.com/StefanKandlbinder/link-previewer/blob/main/functions/willhaben-stats/willhaben-stats.js">netlify function</a>.</li>
                <li>By the use of a <a title="Netlify Scheduled Function" href="https://github.com/StefanKandlbinder/link-previewer/blob/main/functions/willhaben-database-scheduled/willhaben-database-scheduled.js">netlify scheduled function</a> the data is grabbed every day on 09:00-AM and written into a <a href="https://firebase.google.com/products/realtime-database">firebase reailtime database.</a>.</li>
            </ul>
        </p>
        <h3>What's the deal?</h3>
        <p>To get a feeling what's possible, just head over to the <router-link to="/chart" class="hover:underline">chart</router-link> section...</p>
    </section>
  </article>
</template>
<script>
import LinkPreviewer from "../components/LinkPreviewer.vue";
export default {
    components: { LinkPreviewer },
    setup() {},
}
</script>