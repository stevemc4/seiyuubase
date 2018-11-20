<template>
    <div class="p-8 pt-4 mdr" v-html="renderedMarkdown"></div>
</template>

<script>
import mi from 'markdown-it'
import axios from 'axios'

const md = mi()

export default {
    data(){
        return{
            md: ""
        }
    },
    created(){
        this.getFile()    
    },
    computed: {
        renderedMarkdown(){
            return md.render(this.md)
        }
    },
    methods:
    {
        async getFile()
        {
            let data = await axios.get(`https://raw.githubusercontent.com/stevemc4/seiyuubase/master/${this.$route.meta.fileToRender}.md`)
            this.md = data.data
        }
    },
    watch: {
        $route(){
            this.getFile()
        }
    }

}
</script>

<style>
    
</style>
