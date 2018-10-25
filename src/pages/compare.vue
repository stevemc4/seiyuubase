<template>
    <div class="p-8">
        <h1 class="text-3xl font-normal text-grey-darker">Compare</h1>
        <div class="flex mt-4">
            <div class="w-1/2 pr-2">
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
                            <span class="font-normal text-black text-2xl" v-if="(info.first.name != undefined)">{{`${info.first.name.first} ${info.first.name.last}`}}</span>
                        </div>
                        <div :class="{'w-24 h-4 bg-grey-dark rounded-full mt-2': info.first.name == undefined}" class="">
                            <span class="mt-1 font-normal text-grey-darker text-sm" v-if="(info.first.name != undefined)">{{`${info.first.name.native}`}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2 pl-2">
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
                            <span class="font-normal text-black text-2xl" v-if="(info.second.name != undefined)">{{`${info.second.name.first} ${info.second.name.last}`}}</span>
                        </div>
                        <div :class="{'w-24 h-4 bg-grey-dark rounded-full mt-2': info.second.name == undefined}" class="">
                            <span class="mt-1 font-normal text-grey-darker text-sm" v-if="(info.second.name != undefined)">{{`${info.second.name.native}`}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row-reverse mt-4">
            <button class="px-4 py-3 text-white bg-purple rounded hover:bg-purple-dark">Compare!</button>
        </div>
    </div>
</template>

<script>
import { GraphQLClient } from "graphql-request" 
var client = new GraphQLClient("https://graphql.anilist.co") 

export default {
    name: 'Compare',
    data(){
        return{
            info: {
                first: {},
                second: {}
            },
            animeList: {
                first: [],
                last: []
            },
            firstText: '',
            secondText: ''
        }
    },
    methods: {
        async loadData(target, name){
        let query = `
            query ($name: String){
                Staff(search: $name, sort: FAVOURITES_DESC) {
                    name {
                    first
                    last
                    native
                    }
                    image {
                    medium
                    }
                    characters(sort: FAVOURITES_DESC, perPage: 24) {
                    edges {
                        id
                        media {
                        title {
                            english
                            romaji
                            native
                        }
                        }
                        node {
                        name {
                            first
                            last
                        }
                        siteUrl
                        }
                    }
                    }
                }
            }` 
        try {
            let result = await client.request(query, {
                name: name
            })
            let info = {
                name: result.Staff.name,
                image: result.Staff.image.medium
            }
            if(target === 1)
            {
                this.info.first = info
            }
            if(target === 2)
            {
                this.info.second = info
            }
        }
        catch(e){
            console.log(e)
        }
        }
    }
}
</script>

<style>

</style>
