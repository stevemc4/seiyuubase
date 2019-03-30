<template>
    <nav 
        :class="{
            shadow: isScrolled, 
            'bg-purple-darker text-white': (!isScrolled && $route.name == 'Index'), 
            'bg-white text-black': (isScrolled || $route.name != 'Index')
        }" 
        class="fixed pin-t z-20 w-full h-16 py-8 md:px-8 px-0 
        border-t-4 border-purple flex items-center animate">
        <div class="hidden md:inline-flex text-lg font-normal items-center">
            <app-icon class="w-8 h-8 animate" :class="{'text-white': (!isScrolled && $route.name == 'Index'), 'text-purple': (isScrolled || $route.name != 'Index')}"/>
            <span class="ml-3">SeiyuuBase</span>
        </div>
        <div class="md:ml-3 h-8 flex-grow flex items-center px-4 md:border-l md:border-grey-dark">
            <span 
                class="material-icons text-lg
                px-1 h-full flex items-center text-purple-dark rounded-tl rounded-bl animate"
                :class="{
                    'bg-purple-darkest text-white': (!isScrolled && $route.name == 'Index'), 
                    'bg-grey-lighter text-purple-dark': (isScrolled || $route.name != 'Index')
                }">
                search
            </span>
            <input 
                @keypress="keyPressHandler" 
                v-model="query" 
                class="outline-none text-sm animate
                p-2 pl-0 rounded-tr rounded-br text-grey-darker w-full text-center md:text-left" 
                :class="{
                    'bg-purple-darkest text-white placeholder': (!isScrolled && $route.name == 'Index'), 
                    'bg-grey-lighter text-black': (isScrolled || $route.name != 'Index')
                }"
                :placeholder="searchPlaceholder"
                type="text" 
                name="vaName"/>
            <button 
                @click="find" 
                class="material-icons focus:outline-none text-lg p-2 outline-none animate"
                :class="{
                    'text-white': (!isScrolled && $route.name == 'Index'), 
                    'text-purple-dark': (isScrolled || $route.name != 'Index')
                }">
                send
            </button>
        </div>
        <ul class="list-reset font-normal text-base hidden md:flex">
            <li><router-link :to="'/'" class="p-2 no-underline flex animate " :class="{'text-grey-lighter hover:text-purple-light': (!isScrolled && $route.name == 'Index'), 'text-grey-darker hover:text-purple-dark': (isScrolled || $route.name != 'Index')}">Home</router-link></li>
            <li><router-link :to="'/compare'" class="p-2 no-underline flex animate " :class="{'text-grey-lighter hover:text-purple-light': (!isScrolled && $route.name == 'Index'), 'text-grey-darker hover:text-purple-dark': (isScrolled || $route.name != 'Index')}">Compare</router-link></li>
            <li><router-link :to="'/about'" class="p-2 no-underline flex animate " :class="{'text-grey-lighter hover:text-purple-light': (!isScrolled && $route.name == 'Index'), 'text-grey-darker hover:text-purple-dark': (isScrolled || $route.name != 'Index')}">About</router-link></li>
            <li><router-link :to="'/changelog'" class="p-2 no-underline flex animate " :class="{'text-grey-lighter hover:text-purple-light': (!isScrolled && $route.name == 'Index'), 'text-grey-darker hover:text-purple-dark': (isScrolled || $route.name != 'Index')}">Changelog</router-link></li>
            <li><a href="https://github.com/stevemc4/seiyuubase" target="_blank" class="animate p-2 no-underline flex" :class="{'text-grey-lighter hover:text-purple-light': (!isScrolled && $route.name == 'Index'), 'text-grey-darker hover:text-purple-dark': (isScrolled || $route.name != 'Index')}">GitHub <span class="material-icons text-base align-middle">open_in_new</span></a></li>
        </ul>
    </nav>
</template>

<script>
import AppIcon from './AppIcon'

export default {
    created(){
        this.$root.$on('changeSearch', this.onChangeSearch)
        window.addEventListener('scroll', this.setShadow)
        window.addEventListener('resize', this.setSearchPlaceholder)
        this.setSearchPlaceholder()
    },
    beforeDestroy()
    {
        window.removeEventListener('scroll', this.setShadow)
        window.removeEventListener('resize', this.setSearchPlaceholder)
    },
    data(){
        return{
            query: "",
            isScrolled: false,
            searchPlaceholder: 'Search'
        }
    },
    components: {AppIcon},
    watch: {
        'window.scrollY': function()
        {
            console.log(window.scrollY)
        }
    },
    methods: {
        find()
        {
            this.$router.push(`/info/${this.query}`)
        },
        onChangeSearch(e)
        {
            this.query = e
        },
        keyPressHandler(e){
            if(e.key == 'Enter')
                this.find()
        },
        setShadow()
        {
            if(window.scrollY == 0)
                this.isScrolled = false
            else this.isScrolled = true
        },
        setSearchPlaceholder()
        {
            if(window.innerWidth <= 768) this.searchPlaceholder = 'Search SeiyuuBase'
            else this.searchPlaceholder = 'Search'
        }
    }
}
</script>

<style lang="postcss">
    .placeholder::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: @apply text-white;
    }
    .placeholder::-moz-placeholder { /* Firefox 19+ */
        color: @apply text-white;
    }
    .placeholder:-ms-input-placeholder { /* IE 10+ */
        color: @apply text-white;
    }
    .placeholder:-moz-placeholder { /* Firefox 18- */
        color: @apply text-white;
    }

    .animate{
        transition: background-color 0.25s, color 0.25s
    }
</style>
