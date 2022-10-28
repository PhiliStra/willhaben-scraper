<template>
  <nav class="nav sticky z-10 top-0 bg-gray-50">
    <div class="container mx-auto px-4 w-full justify-start flex items-center md:hidden h-16">
      <router-link to="/" class="flex mr-8 items-center p-2">
        <svg class="stroke-current w-6 aspect-square" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
          viewBox="0 0 600 600">
          <path vector-effect="non-scaling-stroke" transform="matrix(3.5 0 0 3.5 .225 .225)"
            d="m79.9 148-57-57C45.4 68.5 72 56.8 90.3 59.5L122 27.8c6-6 15.8-6 21.8 0s6 15.8 0 21.8l-32.3 32.3c2 18.3-9.7 44.2-31.6 66.1zm10.4-88.5-9.5 12.8c-1.7 2.3-1.5 5.6.6 7.7l10.1 10c2 2 5.2 2.3 7.5.7l12.5-8.8"
            stroke-linecap="round" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10" fill="none" />
        </svg>
        <span class="text-base font-medium inline-block ml-1 tracking-wide">Scraper</span>
      </router-link>
    </div>
    <div class="bg-gray-50 w-full h-16 fixed bottom-0 md:sticky md:top-0 z-10 items-center justify-center flex">
      <div class="container mx-auto px-4 w-full justify-center md:justify-between flex items-center">
        <router-link to="/" class="md:flex mr-8 items-center hidden p-2">
          <svg class="stroke-current w-6 aspect-square" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
            viewBox="0 0 600 600">
            <path vector-effect="non-scaling-stroke" transform="matrix(3.5 0 0 3.5 .225 .225)"
              d="m79.9 148-57-57C45.4 68.5 72 56.8 90.3 59.5L122 27.8c6-6 15.8-6 21.8 0s6 15.8 0 21.8l-32.3 32.3c2 18.3-9.7 44.2-31.6 66.1zm10.4-88.5-9.5 12.8c-1.7 2.3-1.5 5.6.6 7.7l10.1 10c2 2 5.2 2.3 7.5.7l12.5-8.8"
              stroke-linecap="round" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10" fill="none" />
          </svg>
          <span class="text-base font-medium inline-block ml-1 tracking-wide">Scraper</span>
        </router-link>
        <div class="flex space-x-4 font-medium">
          <router-link to="/chart" class="">
            <span class="flex justify-center items-center flex-col md:flex-row min-w-12 min-h-12 px-2">
              <svg class="stroke-current w-6 aspect-square" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                viewBox="0 0 600 600">
                <path vector-effect="non-scaling-stroke" d="m80 440 160-160 80 120 200-200" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
              <span class="text-xs font-semibold md:font-medium md:text-base tracking-wide md:ml-1">Chart</span>
            </span>
          </router-link>
          <router-link to="/scraper" class="flex items-center">
            <span class="flex justify-center items-center flex-col md:flex-row min-w-12 min-h-12 px-2">
              <svg class="stroke-current w-5 aspect-square" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                viewBox="0 0 600 600">
                <path vector-effect="non-scaling-stroke" transform="matrix(3.5 0 0 3.5 .225 .225)"
                  d="m79.9 148-57-57C45.4 68.5 72 56.8 90.3 59.5L122 27.8c6-6 15.8-6 21.8 0s6 15.8 0 21.8l-32.3 32.3c2 18.3-9.7 44.2-31.6 66.1zm10.4-88.5-9.5 12.8c-1.7 2.3-1.5 5.6.6 7.7l10.1 10c2 2 5.2 2.3 7.5.7l12.5-8.8"
                  stroke-linecap="round" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10"
                  fill="none" />
              </svg>
              <span class="text-xs font-semibold md:font-medium md:text-base tracking-wide md:ml-1">Scrape</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mx-auto pb-16 p-4 md:pb-4 text-center">
    <router-view />
  </div>
</template>

<script>
export default {
  setup() { },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (pointer: coarse) {

  .nav a,
  .nav a:focus,
  .nav a:focus-visible {
    transition: all .5s ease-out;
    -webkit-tap-highlight-color: transparent;
    @apply border border-black rounded-lg;
    box-shadow: 2px 2px 0 2px;
    transform: translate(0, 0);
  }

  .nav .router-link-active {
    @apply no-underline overflow-hidden;
    animation: button .1s ease-out 1 forwards;
  }
}

@keyframes button {
  0% {
    box-shadow: 2px 2px 0 2px;
    transform: translate(0, 0);
  }

  100% {
    box-shadow: -1px -1px 0 1px;
    transform: translate(2px, 2px);
  }
}

@media (pointer: fine) {
  .nav .router-link-active {
    @apply underline;
  }
}
</style>
