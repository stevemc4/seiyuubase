<template>
    <div class="p-8">
        <h1 class="text-3xl font-normal text-grey-darker">Compare</h1>
        <div class="flex mt-4 flex-col md:flex-row">
            <div class="w-full md:w-1/2 pr-2">
                <span class="font-normal text-lg text-grey-darker">1st Voice Actor</span>
                <div class="flex mt-3">
                    <input placeholder="Try 'Kana Hanazawa'" v-model="firstText" class="flex-grow h-10 p-2 rounded-lg border-2 border-r-0 border-purple outline-none rounded-tr-none rounded-br-none" type="text">
                    <button @click="loadData(1, firstText)" class="focus:outline-none w-24 h-10 p-2 rounded-tr-lg rounded-br-lg bg-purple text-white">Check</button>
                </div>
                <div class="mt-4 flex">
                    <div class="bg-grey-dark rounded-full w-24 h-24">
                        <img style="object-fit: cover;" v-if="(info.first.image != undefined)" :src="info.first.image" alt="" class="rounded-full w-24 h-24">
                    </div>
                    <div class="ml-4 pt-2">
                        <div :class="{'w-48 h-6 bg-grey-dark rounded-full': info.first.name == undefined}">
                            <span class="font-normal text-black text-2xl" v-if="(info.first.name != undefined)">{{`${info.first.name.first || ''} ${info.first.name.last || ''}`}}</span>
                        </div>
                        <div :class="{'w-24 h-4 bg-grey-dark rounded-full mt-2': info.first.name == undefined}" class="">
                            <span class="mt-1 font-normal text-grey-darker text-sm" v-if="(info.first.name != undefined)">{{`${info.first.name.native}`}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/2 pl-2 mt-4 md:mt-0">
                <span class="font-normal text-lg text-grey-darker">2nd Voice Actor</span>
                <div class="flex mt-3">
                    <input placeholder="Try 'Inori Minase'" v-model="secondText" class="flex-grow h-10 p-2 rounded-lg border-2 border-r-0 border-purple outline-none rounded-tr-none rounded-br-none" type="text">
                    <button @click="loadData(2, secondText)" class="focus:outline-none w-24 h-10 p-2 rounded-tr-lg rounded-br-lg bg-purple text-white">Check</button>
                </div>
                <div class="mt-4 flex">
                    <div class="bg-grey-dark rounded-full w-24 h-24">
                        <img style="object-fit: cover;" v-if="(info.second.image != undefined)" :src="info.second.image" alt="" class="rounded-full w-24 h-24">
                    </div>
                    <div class="ml-4 pt-2">
                        <div :class="{'w-48 h-6 bg-grey-dark rounded-full': info.second.name == undefined}">
                            <span class="font-normal text-black text-2xl" v-if="(info.second.name != undefined)">{{`${info.second.name.first || ''} ${info.second.name.last || ''}`}}</span>
                        </div>
                        <div :class="{'w-24 h-4 bg-grey-dark rounded-full mt-2': info.second.name == undefined}" class="">
                            <span class="mt-1 font-normal text-grey-darker text-sm" v-if="(info.second.name != undefined)">{{`${info.second.name.native}`}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row-reverse mt-4 items-center">
            <button @click="startCompare()" class="px-4 py-3 text-white bg-purple rounded hover:bg-purple-dark">Compare!</button>
            <span class="font-normal mr-4 text-black">Status: {{status}}</span>
        </div>
        <div class="flex mt-4 flex-wrap">
            <div v-for="item in compareResult" :key="item.show.title.native" class="bg-white p-4 rounded-lg w-full block shadow my-2">
                <div class="flex items-center w-full">
                    <span class="flex-grow font-normal text-xl text-black">{{item.show.title.english || item.show.title.romaji || item.show.title.native}}</span>
                    <span class="font-normal text-lg text-grey-darker">{{item.show.year}}</span>
                </div>
                <div class="flex items-center mt-2">
                    <div class="flex w-1/2">
                        <img :src="item.left.picture" class="rounded-full h-24 w-24 border-purple-darker border-2" style="object-fit: cover">
                        <div class="flex items-center ml-2">
                            <div>
                                <span class="font-normal text-sm text-grey-dark block">as</span>
                                <span class="font-normal text-lg text-grey-darkest block">{{`${item.left.name.first || ''} ${item.left.name.last || ''}`}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-1/2">
                        <img :src="item.right.picture" class="rounded-full h-24 w-24 border-purple-darker border-2" style="object-fit: cover">
                        <div class="flex items-center ml-2">
                            <div>
                                <span class="font-normal text-sm text-grey-dark block">as</span>
                                <span class="font-normal text-lg text-grey-darkest block">{{`${item.right.name.first || ''} ${item.right.name.last || ''}`}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GraphQLClient } from 'graphql-request'
var client = new GraphQLClient('https://graphql.anilist.co')

export default {
  name: 'Compare',
  data() {
    return {
      info: {
        first: {},
        second: {}
      },
      animeList: {
        first: [],
        last: []
      },
      compareResult: [],
      firstText: '',
      secondText: '',
      status: 'Ready',
      isDoneComparing: false
    }
  },
  methods: {
    async loadData(target, name) {
      let query = `
                query ($name: String){
                    Staff(search: $name, sort: FAVOURITES_DESC) {
                        id
                        name {
                        first
                        last
                        native
                        }
                        image {
                        medium
                        }
                    }
                }`
      try {
        let result = await client.request(query, {
          name: name
        })
        let info = {
          id: result.Staff.id,
          name: result.Staff.name,
          image: result.Staff.image.medium
        }
        if (target === 1) {
          this.info.first = info
        }
        if (target === 2) {
          this.info.second = info
        }
      } catch (e) {
        this.status = `Can't Find "${name}"!`
      }
    },
    async preloadShows(owner) {
      let id = 0
      let name = ""
      if (owner == 1) {
        id = this.info.first.id
        name = `${this.info.first.name.first} ${this.info.first.name.last}`
      } else if (owner == 2) {
        id = this.info.second.id
        name = `${this.info.second.name.first} ${this.info.second.name.last}`
      }
      let shows = [];
      let hasNextPage = true
      let currentPage = 1
      do {
        let query = `
                query($id: Int, $page: Int){
                    Staff(id: $id)
                    {
                        characters(perPage: 25, page: $page, sort: FAVOURITES_DESC)
                        {
                            edges{
                                id
                                node{
                                    name{
                                        first
                                        last
                                    }
                                    image{
                                        medium
                                    }
                                }
                                media{
                                    id
                                    title{
                                        english
                                        romaji
                                        native
                                    }
                                    coverImage{
                                        medium
                                    }
                                    format
                                    startDate{
                                        year
                                    }
                                }
                            }
                            pageInfo{
                                total
                                hasNextPage
                                currentPage
                                perPage
                                lastPage
                            }
                        }
                    }
                }
                `
        try {
          let result = await client.request(query, {
            id,
            page: currentPage
          })
          this.status = `Processing ${name}'s character data (page ${result.Staff.characters.pageInfo.currentPage} of ${result.Staff.characters.pageInfo.lastPage})`
          result.Staff.characters.edges.forEach(e => {
            e.media.forEach(x => {
              if (
                x.format == 'TV' ||
                x.format == 'MOVIE' ||
                x.format == 'TV_SHORT'
              )
                shows.push({
                  title: x.title,
                  year: x.startDate.year,
                  id: x.id,
                  cover: x.coverImage.medium,
                  as: {
                      name: e.node.name,
                      picture: e.node.image.medium
                  }
                })
            })
          })
          if (result.Staff.characters.pageInfo.hasNextPage) currentPage++
          else hasNextPage = false
        } catch (e) {
          console.log(e)
          hasNextPage = false
        }
      } while (hasNextPage)
      if(owner == 1) this.animeList.first = shows
      else this.animeList.last = shows
    },
    async startCompare()
    {
        if(this.info.first.id != undefined && this.info.second.id != undefined)
        {
            if(this.info.first.id != this.info.second.id)
            {
                this.compareResult = []
                await this.preloadShows(1)
                await this.preloadShows(2)
                this.status = 'Analyzing Shows (Found 0 Shows)'
                this.compare()
                this.status = 'Ready'
                this.isDoneComparing = true
                this.animeList.first = []
                this.animeList.last = []
            }
            else this.status = 'Can\'t compare with same voice actor!'

        }
        else this.status = 'VA data is empty, did you clicked the "check" button?'
    },
    compare()
    {
        this.animeList.first.forEach((e) => {
            this.animeList.last.forEach((x) => {
                if(e.id == x.id)
                {
                    this.compareResult.push({
                        show: {
                            title: e.title,
                            cover: e.cover,
                            year: e.year
                        },
                        left: e.as,
                        right: x.as
                    })
                    this.status = `Analyzing Shows (Found ${this.compareResult.length} Shows)`
                }
            })
        })
    }
  }
}
</script>

<style>
</style>
