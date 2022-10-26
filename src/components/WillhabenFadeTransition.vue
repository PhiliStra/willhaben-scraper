<template>
    <Transition name="fade" appear>
        <slot></slot>
    </Transition>
</template>
  
<style>
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
    opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>