<template>
<div>
  <div class="w-full bg-purple-darker h-64 text-white p-8 font-normal flex items-center">
    <div class="flex-grow">
      <h1 class="text-center font-normal">A site for your seiyuu needs!</h1>
      <h2 class="text-center font-normal text-lg text-purple-lighter mt-2">Find information on your favorite seiyuu with SeiyuuBase</h2>
    </div>
  </div>
  <div class="w-full rounded-none md:w-1/2 xl:w-1/3 md:-mt-12 h-24 bg-white shadow md:rounded-lg p-4 table mx-auto">
    <div class="flex mt-3">
      <input @keypress="keyPressHandler" placeholder="Try 'Kana Hanazawa'" v-model="query" class="flex-grow h-10 p-2 rounded-lg border-2 border-r-0 border-purple outline-none rounded-tr-none rounded-br-none" type="text">
      <button @click="find" class="focus:outline-none w-12 h-10 p-2 rounded-tr-lg rounded-br-lg bg-purple text-white material-icons">search</button>
    </div>
  </div>
  <div class="p-8">
    <span class="font-normal text-2xl text-grey-darkest">Highest-Ranked Seiyuu</span>
    <span class="font-normal block text-lg mt-2 text-grey-darker">According to AniList Favorites</span>
    <span class="block mt-4 font-normal text-xl text-center text-grey-dark" v-if="topActors.length == 0">Loading...</span>
    <ul class="flex list-reset flex-wrap mt-2 -ml-2">
      <li class="w-full md:w-1/2 xl:w-1/3 p-2" v-for="item in topActors" :key="item.name.native">
        <div @click="$router.push(`/info/${((item.name.first != undefined) ? item.name.first : '') + ((item.name.last != undefined) ? ' ' + item.name.last : '')}`)" class="bg-white shadow rounded-lg flex h-32 cursor-pointer">
          <div class="flex items-center w-32 p-4">
            <img class="rounded-full w-full h-full" style="object-fit: cover" :src="item.image"/>
          </div>
          <div class="ml-2 mt-4">
            <span class="font-normal text-lg text-black block">{{item.name.first}} {{item.name.last}}</span>
            <span class="font-normal text-base text-grey-darker block mt-2">{{item.name.native}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {GraphQLClient} from 'graphql-request'

const graphql = new GraphQLClient('https://graphql.anilist.co')

export default {
  name: 'Index',
  data () {
    return {
      query: '',
      topActors: []
    }
  },
  async mounted(){
    this.topActors = []
    let query = `{
      Page{
        staff(sort: FAVOURITES_DESC){
          name{
            first
            last
            native
          }
          image{
            medium
          }
          characters{
            edges{
              node{
                id
              }
              media{
                format
              }
            }
          }
        }
      }
    }`
    let data = await graphql.request(query)
    for(let staff of data.Page.staff)
    {
      let count = 0
      for(let character of staff.characters.edges)
        for(let media of character.media)
          if(media.format == 'TV' || media.format == 'MOVIE' || media.format == 'TV_SHORT') count++
      if(count > 0)
      {
        this.topActors.push({
          name: staff.name,
          image: staff.image.medium,
          roleCount: count
        })
      }
    }
  },
  methods: {
    find()
    {
      this.$root.$emit('changeSearch', this.query)
      this.$router.push(`/info/${this.query}`)
    },
    keyPressHandler(e){
      if(e.key == 'Enter')
        this.find()
    }
  }
}
</script>


