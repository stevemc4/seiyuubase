<template>
    <nav class="fixed pin-t z-20 w-full h-16 p-8 bg-white shadow border-t-4 border-purple flex items-center">
        <span class="text-lg font-normal text-grey-darkest">SeiyuuBase</span>
        <div class="ml-4 h-8 flex-grow flex items-center px-4 border-l border-grey-dark">
            <span class="material-icons text-lg bg-grey-lighter px-1 h-full flex items-center text-purple-dark rounded-tl rounded-bl">search</span>
            <input v-model="query" class="outline-none text-sm bg-grey-lighter p-2 pl-0 rounded-tr rounded-br text-grey-darker w-48" placeholder="Search" type="text" name="vaName"/>
            <button @click="find" class="material-icons focus:outline-none text-lg p-2 outline-none text-purple-dark">send</button>
        </div>
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
    data(){
        return{
            query: ""
        }
    },
    methods: {
        find()
        {
            this.$router.push(`/info/${this.query}`)
        }
    }
}
</script>

<style scoped>
    
</style>
