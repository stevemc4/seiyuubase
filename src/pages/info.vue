<template>
    <div class="p-8">
        <div v-if="(!isLoading)">
            <div class="flex flex-col md:flex-row">
                <img class="w-32 h-32 md:w-24 md:h-24 rounded-full table mx-auto md:inline-block md:mx-0" style="object-fit: cover" :src="info.image"/>
                <div class="mt-2 md:mt-0 md:ml-4 table mx-auto md:inline-block md:mx-0">
                    <h1 class="text-center md:text-left font-normal text-3xl text-grey-darkest">{{`${info.name.first} ${info.name.last}`}}</h1>
                    <span class="text-center md:text-left block font-normal text-lg text-grey-dark">{{info.name.native}}</span>
                    <p v-html="renderedMarkdown" class="mt-4 md-renderer leading-none"></p>
                </div>
            </div>
            <span class="block font-normal text-grey-darkest text-2xl my-8">Appears In</span>
            <ul class="list-reset flex flex-wrap -ml-2">
                <li class="w-full md:w-1/2 xl:w-1/3 p-2" v-if="item.title.english != undefined || item.title.romaji != undefined || item.title.native != undefined" v-for="item in characters" :key="item.id">
                    <div class="bg-transparent shadow rounded-lg flex h-32">
                        <img style="object-fit: cover" class="rounded-tl-lg rounded-bl-lg h-full w-24" :src="item.coverImage"/>
                        <div class="bg-white relative p-4 w-full rounded-tr-lg rounded-br-lg">
                            <a target="_blank" :href="item.siteUrl" class="block no-underline font-bold text-base text-grey-darkest">{{item.title.english || item.title.romaji || item.title.native}}</a>
                            <span class="block font-normal text-sm mt-1 text-grey-darker">as <a :href="item.as.siteUrl" target="_blank" class="no-underline font-bold text-grey-darkest">{{item.as.name.first}} {{item.as.name.last}}</a></span>
                            <span class="block font-normal text-xs absolute pin-b mb-2 text-grey-dark">{{item.season}} {{item.year}}</span>
                        </div>
                    </div>
                </li>
                <li @click="loadMoreCharacters()" class="w-full md:w-1/2 xl:w-1/3 p-2" v-if="graphQlPage.hasNextPage">
                    <div class="bg-transparent border-2 border-dashed rounded-lg hover:border-purple text-grey-darker hover:text-purple-dark cursor-pointer flex items-center h-32">
                        <div class="table mx-auto select-none">
                            <span v-if="!isLoaderLoading" class="flex-grow font-normal flex items-center">
                                <span class="material-icons mr-2">add</span>
                                Load More
                            </span>
                            <span v-else class="font-normal items-center flex">
                                Loading...
                            </span>
                        </div>    
                    </div>
                </li>
            </ul>
            <span class="block font-normal text-grey-darkest text-2xl my-4">Discography</span>
            <ul class="list-reset -ml-2">
                <span class="block font-normal ml-2 text-grey-darker text-lg my-4" v-if="discography.albums.length > 0">Albums</span>
                <li class="py-1 p-2" v-for="item in discography.albums" v-if="item['secondary-types'] == undefined" :key="item.id">
                <div class="bg-transparent shadow rounded-lg flex">
                    <div class="bg-white relative p-4 w-full rounded-tr-lg rounded-br-lg">
                        <span class="block no-underline font-bold text-base text-grey-darkest">{{item.title}}</span>
                    </div>
                </div>
                </li>
                <span class="block font-normal ml-2 text-grey-darker text-lg my-4" v-if="discography.singles.length > 0">Singles</span>
                <li class="p-2 py-1" v-for="item in discography.singles" v-if="item['secondary-types'] == undefined" :key="item.id">
                <div class="bg-transparent shadow rounded-lg flex">
                    <div class="bg-white relative p-4 w-full rounded-tr-lg rounded-br-lg">
                        <span class="block no-underline font-bold text-base text-grey-darkest">{{item.title}}</span>
                    </div>
                </div>
                </li>
                <span class="block font-normal ml-2 text-grey-darker text-lg my-4" v-if="(discography.singles.length == 0 && discography.albums.length == 0)">Not Available</span>
            </ul>
        </div>
        <div class="w-full h-full" v-if="(isLoading)">
            <h1 class="text-3xl font-normal text-grey-darker" v-if="(!notFound)">Loading...</h1>
            <div v-else>
                <h1 class="text-3xl font-normal text-grey-darker">Not found!</h1>
                <span class="text-lg mt-1 block font-normal text-grey-dark">If You believe this person exists, try using <strong class="text-grey-darker">different spelling</strong> or <strong class="text-grey-darker">their native name</strong></span>
            </div>
        </div>
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
    </div>
</template>

<script>
import { GraphQLClient } from 'graphql-request'
import nodebrainz from 'nodebrainz'
import mi from 'markdown-it'

const md = mi({html: true, linkify: true})
var client = new GraphQLClient("https://graphql.anilist.co") 
var mb = new nodebrainz({
     userAgent: "seiyuubase/0.0.1" ,
     port: 443
     }) 
export default {
  data() {
    return {
    id: 0,
    info: {},
    characters: [],
    discography: {
        albums: [],
        singles: []
    },
    isDiscogsLoaded: false,
    notFound: false,
    isLoading: true,
    graphQlPage: {},
    isLoaderLoading: false
    }
  },
  watch: {
      $route (from, to)
      {
        this.isLoading = true
        this.loadData()
      }
  },
  created() {
    this.isLoading = true
    this.loadData()
  },
  mounted() {},
  methods: {
    async loadData(){
        this.characters = []
        this.graphQlPage = {}
        let query = `
            query ($name: String){
                Staff(search: $name) {
                    id
                    name {
                    first
                    last
                    native
                    }
                    image {
                    medium
                    }
                    description
                }
            }` 
        try {
            let result = (await client.request(query, {
                name: this.$route.params.name
            })).Staff
            this.id = result.id
            this.loadMoreCharacters()
            let data = {
                name: result.name,
                description: result.description,
                image: result.image.medium,
            } 
            this.info = data
            document.title = `${data.name.first} ${data.name.last} - SeiyuuBase`
            this.isLoading = false
            this.loadDiscogs(this.info.name.native) 
        } catch (e) {
            console.log(e)
            this.notFound = true
        }
    },
    loadDiscogs(name) {
        try{
            if (!this.isDiscogsLoaded) {
                let a = this 
                mb.search("artist", { artist: name, country: "JP" }, (err, res) => {
                    var id = res.artists[0].id 
                    mb.search(
                        "release-group",
                        { arid: id, artist: res.artists[0].name, primarytype: "album" },
                        (err, res) => {
                        a.discography.albums = res["release-groups"] 
                        }
                    ) 
                    mb.search(
                        "release-group",
                        { arid: id, primarytype: "single", limit: 100 },
                        (err, res) => {
                        a.discography.singles = res["release-groups"] 
                        }
                    ) 
                }) 
                this.isDiscogsLoaded = true 
            }
        }
        catch(e)
        {
            console.log(e)
        }
    },
    processCharacters(data){
        for(let character of data) {
            for(let media of character.media) {
                let item = {
                    id: media.id,
                    title: media.title,
                    year: media.startDate.year,
                    siteUrl: media.siteUrl,
                    season: media.season,
                    coverImage: media.coverImage.medium,
                    as: {
                        name: character.node.name,
                        siteUrl: character.node.siteUrl
                    }
                }
                if (media.format == "TV" || media.format == "MOVIE" || media.format == "TV_SHORT")
                    this.characters.push(item) 
            } 
        }
    },
    async loadMoreCharacters(){
        try{
            this.isLoaderLoading = true
            let query = `
            query($id: Int, $page: Int){
                Staff(id: $id) {
                    characters(sort: FAVOURITES_DESC, perPage: 24, page: $page) {
                    edges {
                        id
                        media {
                        title {
                            english
                            romaji
                            native
                        }
                        season
                        startDate {
                            year
                        }
                        coverImage {
                            medium
                        }
                        siteUrl
                        format
                        }
                        node {
                        name {
                            first
                            last
                        }
                        siteUrl
                        }
                    }
                    pageInfo {
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
            let result = (await client.request(query, {
                id: this.id,
                page: this.graphQlPage.currentPage + 1 || 1
            })).Staff.characters
            this.processCharacters(result.edges)
            this.graphQlPage = result.pageInfo
            this.isLoaderLoading = false
            }
        catch(e)
        {
            this.isLoaderLoading = false
        }
    }
  },
  computed: {
      renderedMarkdown()
      {
          return md.render(this.info.description)
      }
  }
} 
</script>

<style>
</style>
