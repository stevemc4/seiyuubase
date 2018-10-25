<template>
<div>
    <h1 v-if="isLoading" class="p-8 pt-4 text-grey-darkest text-3xl">Fetching changelog...</h1>
    <md class="p-8 pt-4 mdr" :source="md"></md>
</div>
</template>

<script>
import md from 'vue-markdown'
import axios from 'axios'

export default {
    components: {md},
    data(){
        return{
            md: "",
            isLoading: true
        }
    },
    async created(){
        let data = await axios.get('https://raw.githubusercontent.com/stevemc4/seiyuubase/master/CHANGELOG.md')
        this.md = data.data
        this.isLoading = false
    }
}
</script>

<style>
    
</style>
