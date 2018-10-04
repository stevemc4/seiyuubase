<template>
    <nav class="fixed pin-t z-20 w-full h-16 p-8 bg-white shadow border-t-4 border-purple flex items-center">
        <span class="text-xl font-normal text-grey-darkest flex-grow">SeiyuuBase</span>
        <ul class="list-reset font-normal text-base flex">
            <li><router-link :to="'/'" class="p-2 no-underline text-grey-dark hover:text-purple-dark">Home</router-link></li>
            <li><router-link :to="'/about'" class="p-2 no-underline text-grey-dark hover:text-purple-dark">About</router-link></li>
            <li><router-link :to="'/changelog'" class="p-2 no-underline text-grey-dark hover:text-purple-dark">Changelog</router-link></li>
            <li><a href="https://github.com/stevemc4/seiyuubase" target="_blank" class="p-2 no-underline text-grey-dark hover:text-purple-dark">GitHub</a></li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
    
</style>
