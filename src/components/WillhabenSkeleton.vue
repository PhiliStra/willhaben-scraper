<template>
    <svg class="scrape fill-curent opacity-60" id="Ebene_2" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 146.06 146.91">
        <path
            d="M67.25,135.77L10.27,78.79c22.45-22.45,49.09-34.18,67.43-31.44l31.74-31.74c6.01-6.01,15.75-6.01,21.76,0,6.01,6.01,6.01,15.75,0,21.76l-32.32,32.32c1.98,18.28-9.73,44.18-31.63,66.08Zm10.45-88.43l-9.49,12.76c-1.74,2.34-1.5,5.6,.56,7.66l10.07,10.07c2.02,2.02,5.2,2.29,7.53,.65l12.51-8.8"
            fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
    </svg>
</template>
<script>
export default {
    setup() {

    },
}
</script>
<style>
.scrape {
    animation: scrape 1s linear infinite forwards;
}

@keyframes scrape {
    0% {
        transform: translate(0, 0)
    }

    75% {
        transform: translate(-10px, 10px)
    }

    100% {
        transform: translate(0px, 0px)
    }
}
</style>