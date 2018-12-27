<template lang="pug">
    li.hj
      h2: a( target="_blank" @click="vm.getInfo(artist.mbid)") {{artist.name}}
      img(:src="artist.image[2]['#text']")
</template>

<script>
export default {
    name: 'artist',
    props: ['artist'],
    methods: {
        // getInfo(mb){
        //     console.log(mb)
        // }
    }
}
// vm.$refs.artistA.doSomething();
</script>

<style lang="stylus" scoped>
li.artist
    display block
    margin 50px 0
</style>
