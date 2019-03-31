<template>
<div>
    <div class="relative w-full bg-purple-darker text-white px-8 py-32 font-normal flex items-center">
        <div class="flex-grow">
          <h1 class="font-normal">A site for your seiyuu needs!</h1>
          <h2 class="font-normal text-lg text-purple-lighter mt-2">Find information on your favorite seiyuu with SeiyuuBase</h2>
          <div class="flex mt-4">
              <input 
                  @keypress="keyPressHandler" 
                  :placeholder="`Try '${randomNames}'`" 
                  v-model="query" 
                  class="flex-grow max-w-sm h-12 p-2 rounded-lg 
                  outline-none bg-purple-darkest rounded-tr-none rounded-br-none text-white" type="text">
              <button @click="find" class="focus:outline-none w-12 h-12 p-2 rounded-tr-lg rounded-br-lg bg-purple-dark text-white material-icons">search</button>
          </div>
        </div>
    </div>
    <div class="p-8">
        <span class="font-normal text-2xl text-grey-darkest">Highest-Ranked Seiyuu</span>  
        <span class="font-normal block text-lg mt-2 text-grey-darker">According to AniList Favorites</span>
        <span class="block mt-4 font-normal text-xl text-center text-grey-dark" v-if="topActors.length == 0">Loading...</span>
        <ul class="flex list-reset flex-wrap mt-8 -ml-2">
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
import dateFn from 'date-fns'

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
    let cache = JSON.parse(localStorage.getItem('topActorCache'))
    if(cache != null && dateFn.compareAsc(cache.expiryDate, new Date()) > -1)
      this.topActors = cache.items
    else{
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
      let expiryDate = dateFn.addHours(new Date(), 12)
      let cache = {
        items: this.topActors,
        expiryDate: expiryDate
      }
      localStorage.setItem('topActorCache', JSON.stringify(cache))
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
  },
  computed: {
    randomNames(){
      let names = [
        'Kana Hanazawa',
        'Inori Minase',
        'Ayane Sakura',
        'Rie Takahashi',
        'Mamoru Miyano',
        'Yoshitsugu Matsuoka',
        'Jun Fukuyama',
        'Kaito Ishikawa',
        'Tomokazu Sugita',
        'Hiroshi Kamiya'
      ]
      let number = Math.floor(Math.random() * names.length)
      return names[number]
    }
  }
}
</script>


