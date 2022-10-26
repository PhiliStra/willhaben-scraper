<template>
    <Transition name="fade" mode="out-in">
        <slot></slot>
    </Transition>
</template>
  
<style>
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
    opacity: 1;
}
</style>