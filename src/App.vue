<template>
  <div id="app">
    <navbar/>
    <router-view class="mt-16 mb-16 md:mb-0"/>
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
