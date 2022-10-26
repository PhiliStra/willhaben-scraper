<template>
    <svg class="line-chart-loader fade" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 600 600">
        <path class="draw" d="m50 475 100-275 100 225L350 50l100 500 100-300" stroke="var(--stroke-color)" fill="none"
            stroke-width="var(--stroke-width)" stroke-linecap="round" stroke-linejoin="round" />
        <path class="circle-1" d="M150 180c11.04 0 20 8.96 20 20s-8.96 20-20 20-20-8.96-20-20 8.96-20 20-20z"
            stroke="var(--stroke-color)" stroke-width="var(--stroke-width)" fill="var(--fill-color)" />
        <path class="circle-2" d="M250 405c11.04 0 20 8.96 20 20s-8.96 20-20 20-20-8.96-20-20 8.96-20 20-20z"
            stroke="var(--stroke-color)" stroke-width="var(--stroke-width)" fill="var(--fill-color)" />
        <path class="circle-3" d="M350 30c11.04 0 20 8.96 20 20s-8.96 20-20 20-20-8.96-20-20 8.96-20 20-20z"
            stroke="var(--stroke-color)" stroke-width="var(--stroke-width)" fill="var(--fill-color)" />
        <path class="circle-4" d="M450 525.5c11.04 0 20 8.96 20 20s-8.96 20-20 20-20-8.96-20-20 8.96-20 20-20z"
            stroke="var(--stroke-color)" stroke-width="var(--stroke-width)" fill="var(--fill-color)" />
    </svg>
</template>
<script>
export default {
    setup() {

    },
}
</script>
<style>
.line-chart-loader {
    --stroke-width: 6;
    --animation-duration: 2s;
    --stroke-color: #111827;
    --fill-color: transparent;

    opacity: 0.75;
}

.draw {
    stroke-dasharray: 2150;
    stroke-dashoffset: 2150;
    opacity: 1;
    animation: draw var(--animation-duration) linear infinite forwards;
}

.fade {
    opacity: 0;
    animation: fade-out var(--animation-duration) ease-in infinite forwards;
}

.circle-1 {
    transform: scale(0);
    animation: circle-1 var(--animation-duration) ease-in infinite forwards;
    transform-origin: 150px 200px;
}

.circle-2 {
    transform: scale(0);
    animation: circle-2 var(--animation-duration) ease-in infinite forwards;
    transform-origin: 250px 425px;
}

.circle-3 {
    transform: scale(0);
    animation: circle-3 var(--animation-duration) ease-in infinite forwards;
    transform-origin: 350px 50px;
}

.circle-4 {
    transform: scale(0);
    animation: circle-4 var(--animation-duration) ease-in infinite forwards;
    transform-origin: 450px 545px;
}


@keyframes draw {
    0% {
        stroke-dashoffset: 2150;
    }

    100% {
        stroke-dashoffset: 0;

    }
}

@keyframes fade-out {
    0% {
        opacity: 0;
    }

    10% {
        opacity: 1;

    }

    90% {
        opacity: 1;

    }

    100% {
        opacity: 0;

    }
}

@keyframes circle-1 {
    0% {
        transform: scale(0)
    }

    13% {
        transform: scale(0)
    }

    21% {
        transform: scale(1)
    }

    90% {
        transform: scale(1)
    }

    100% {
        transform: scale(0)
    }
}

@keyframes circle-2 {
    0% {
        transform: scale(0)
    }

    25% {
        transform: scale(0)
    }

    33% {
        transform: scale(1)
    }

    90% {
        transform: scale(1)
    }

    100% {
        transform: scale(0)
    }
}

@keyframes circle-3 {
    0% {
        transform: scale(0)
    }

    42% {
        transform: scale(0)
    }

    50% {
        transform: scale(1)
    }

    90% {
        transform: scale(1)
    }

    100% {
        transform: scale(0)
    }
}

@keyframes circle-4 {
    0% {
        transform: scale(0)
    }

    66% {
        transform: scale(0)
    }

    74% {
        transform: scale(1)
    }

    90% {
        transform: scale(1)
    }

    100% {
        transform: scale(0)
    }
}
</style>