<template>
<div>
  <div class="w-full bg-purple-darker h-64 text-white p-8 font-normal flex items-center">
    <div class="flex-grow">
      <h1 class="text-center ">A site for your seiyuu needs!</h1>
      <h2 class="text-center text-lg text-purple-lighter mt-2">Find information on your favorite anime voice actors here</h2>
    </div>
  </div>
  <div class="w-1/2 lg:w-1/3 -mt-12 h-24 bg-white shadow rounded-lg p-4 table mx-auto">
    <div class="flex mt-3">
      <input placeholder="Try 'Kana Hanazawa'" v-model="query" class="flex-grow h-10 p-2 rounded-lg border-2 border-r-0 border-purple outline-none rounded-tr-none rounded-br-none" type="text">
      <button @click="find" class="focus:outline-none w-24 h-10 p-2 rounded-tr-lg rounded-br-lg bg-purple text-white">Search</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      query: ''
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
