<template>
    <div class="fixed md:hidden z-20 pin-b pin-l w-screen h-16 bg-white border-t flex items-center">
        <router-link class="p-4 flex-1 text-center no-underline" :to="'/'">
            <span class="material-icons block font-normal text-black">home</span>
            <span class="font-normal block text-grey-darkest mt-1">Home</span>
        </router-link>
        <router-link class="p-4 flex-1 text-center no-underline" :to="'/compare'">
            <span class="material-icons block font-normal text-black">compare_arrows</span>
            <span class="font-normal block text-grey-darkest mt-1">Compare</span>
        </router-link>
        <router-link class="p-4 flex-1 text-center no-underline" :to="'/about'">
            <span class="material-icons block font-normal text-black">description</span>
            <span class="font-normal block text-grey-darkest mt-1">About</span>
        </router-link>
        <router-link class="p-4 flex-1 text-center no-underline" :to="'/changelog'">
            <span class="material-icons block font-normal text-black">av_timer</span>
            <span class="font-normal block text-grey-darkest mt-1">Changelog</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ActionBar'
}
</script>

<style>

</style>
