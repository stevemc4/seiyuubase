<template>
    <div class="p-8">
        <h1 class="font-sans text-purple font-normal" style="font-size: 8rem">404</h1>
        <div class="my-4 w-24 h-1 bg-purple rounded"/>
        <span class="block font-normal text-2xl text-grey-darkest">The page you're looking for doesn't exist or already removed.</span>
        <a class="inline-block mt-2 font-normal text-xl no-underline text-purple-dark flex items-center" href="/"><span class="material-icons">keyboard_arrow_left</span> Go To Home</a>
        <span class="block mt-2 font-normal text-lg text-grey-darker">
            Do you think it's an error? 
            <a class="no-underline text-purple-dark" href="https://github.com/stevemc4/seiyuubase/issues">File an issue on GitHub</a>
        </span>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style>

</style>
