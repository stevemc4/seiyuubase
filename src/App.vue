<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import './assets/styles/main.css'
import Navbar from '@/components/navbar'
export default {
  name: 'App',
  components: {Navbar}
}
</script>

<style>
#app {
  @apply font-bold
}
</style>
