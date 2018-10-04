<template>
    <md class="p-8 pt-4 mdr" :source="md"></md>
</template>

<script>
import md from 'vue-markdown'
import axios from 'axios'

export default {
    components: {md},
    data(){
        return{
            md: ""
        }
    },
    async created(){
        let data = await axios.get('https://raw.githubusercontent.com/stevemc4/seiyuubase/master/README.md')
        this.md = data.data
    }
}
</script>

<style>
    
</style>
