<template>
  <div id="app" class="text-black font-sans">
    <navbar/>
    <router-view class="mt-16"/>
    <footer class="mb-16 md:mb-0 px-8 py-4">
      <span class="mt-8 block text-base font-normal text-grey-darkest">Voice actor data provided by <a href="https://anilist.co" class="no-underline text-purple-dark" target="_blank" rel="noopener">AniList</a> API, Discography data by <a href="https://musicbrainz.org" class="no-underline text-purple-dark" target="_blank" rel="noopener">MusicBrainz</a></span>
        <span class="mt-1 block text-base font-normal text-grey-darker">This site is not affiliated or sponsored by AniList and/or MusicBrainz in any way</span>
        <span class="mt-2 block text-sm font-normal text-grey-darker flex items-center">
            <app-icon class="text-purple w-6 h-6"/>
            <div class="ml-2">
              <span class="font-bold">SeiyuuBase, {{new Date().getFullYear()}}.</span>
              made by 
              <a href="http://dhikarizky.ga" rel="noopener" class="no-underline text-purple-dark" target="_blank">Dhika Rizky</a> 
              with <a href="https://vuejs.org" rel="noopener" class="no-underline text-purple-dark" target="_blank">Vue</a>, 
              <a href="https://tailwindcss.com" rel="noopener" class="no-underline text-purple-dark" target="_blank">Tailwind</a>, 
              <a href="https://graphql.org" rel="noopener" class="no-underline text-purple-dark" target="_blank">GraphQL</a>, 
              <a href="https://github.com/prisma/graphql-request" rel="noopener" class="no-underline text-purple-dark" target="_blank">graphql-request</a>, 
              <a href="https://github.com/jbraithwaite/nodebrainz" rel="noopener" class="no-underline text-purple-dark" target="_blank">nodebrainz</a>,
              and my spare time.
            </div>
        </span>
        <span class="font-normal text-grey-darker block mt-4 text-sm">seiyuubase:{{head}} build {{ref}} · built from <a class="no-underline text-grey-darker font-bold" :href="`https://github.com/stevemc4/seiyuubase/tree/${head}`" target="_blank" rel="noopener">github:stevemc4/{{head}}</a></span>
    </footer>
    <actionbar/>
  </div>
</template>

<script>
import AppIcon from './components/AppIcon'
import './assets/styles/main.css'
import Navbar from '@/components/navbar'
import Actionbar from '@/components/actionbar'
export default {
  name: 'App',
  components: {Navbar, Actionbar, AppIcon},
  data(){
    return{
      head: process.env.HEAD,
      ref: process.env.COMMIT_REF
    }
  },
  mounted(){
    console.log(process.env)
  }
}
</script>

<style>
#app {
  @apply font-bold
}
</style>
