# seiyuubase

> A site for your _seiyuu_ needs!

SeiyuuBase is a site focused on Japanese voice actors and actresses (_声優_ _seiyuu_)

## Motivation

It starts as a random talk with my fellow _weeaboo_ friends about best voice actresses and where they're topped and I think "why not write an app for that?". And the discussion ends with I saying "Gonna create an _seiyuu_ app soon". Added by my urge to find other anime where both [Kana Hanazawa](https://en.wikipedia.org/wiki/Kana_Hanazawa) and [Inori Minase](https://en.wikipedia.org/wiki/Inori_Minase) starred after [A Place Further Than the Universe](https://en.wikipedia.org/wiki/A_Place_Further_than_the_Universe) ended, thus SeiyuuBase born after 3 hours of fiddling with AniList's GraphQL API

## Features

* Get anime and character list that features your favorite voice actor
* Get your favorite voice actor's discography data

## Coming Soon

* Find anime that have your selected voice actors starred in it

Inputs and helps are welcome!

## Developing
### Requirements
* Latest LTS version of NodeJS
* Latest NPM

### Commands
``` sh
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Thanks To
* [VueJS](https://github.com/vuejs/vue) for the great frontend framework
* [Tailwind CSS](https://github.com/tailwindcss/tailwindcss) for styling
* [graphql-request](https://github.com/prisma/graphql-request) for GraphQL requests
* [nodebrainz](https://github.com/jbraithwaite/nodebrainz) for querying MusicBrainz API
* [AniList](https://anilist.co) for their great anime database & API
