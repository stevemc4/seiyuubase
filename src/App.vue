<template>
  <div id="app" class="text-black font-sans">
    <navbar/>
    <router-view class="mt-16"/>
    <footer class="mb-16 md:mb-0 p-8">
      <span class="mt-8 block text-base font-normal text-grey-darker">Voice actor data provided by <a href="https://anilist.co" class="no-underline text-purple-dark" target="_blank">AniList</a> API, Discography data provided by <a href="https://musicbrainz.org" class="no-underline text-purple-dark" target="_blank">MusicBrainz</a></span>
        <span class="mt-1 block text-base font-normal text-grey-dark">This site is not affiliated or sponsored by AniList and/or MusicBrainz in any way</span>
        <span class="mt-2 block text-sm font-normal text-grey-dark">
            Made by 
            <a href="http://dhikarizky.ga" class="no-underline text-purple-dark" target="_blank">Dhika Rizky</a> 
            with <a href="https://vuejs.org" class="no-underline text-purple-dark" target="_blank">Vue</a>, 
            <a href="https://tailwindcss.com" class="no-underline text-purple-dark" target="_blank">Tailwind</a>, 
            <a href="https://graphql.org" class="no-underline text-purple-dark" target="_blank">GraphQL</a>, 
            <a href="https://github.com/prisma/graphql-request" class="no-underline text-purple-dark" target="_blank">graphql-request</a>, 
            <a href="https://github.com/jbraithwaite/nodebrainz" class="no-underline text-purple-dark" target="_blank">nodebrainz</a>,
             and my spare time
        </span>
    </footer>
    <actionbar/>
  </div>
</template>

<script>
import './assets/styles/main.css'
import Navbar from '@/components/navbar'
import Actionbar from '@/components/actionbar'
export default {
  name: 'App',
  components: {Navbar, Actionbar}
}
</script>

<style>
#app {
  @apply font-bold
}
</style>
