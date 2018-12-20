<template lang="pug">
    #app
      img(src='./assets/logo.png')
      h1 Music
      spinner(v-show="loading")
      select(v-model="selectedCountry")
        option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
      ul
        artist(v-for="artist in artists"
        v-bind:artist="artist" v-bind:key="artist.mb")
</template>

<script>
import getArtists from './api'
import config from './api/config'
import Artist from './components/Artist.vue'
import Spinner from './Spinner.vue'
export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
          { name: 'Argentina', value: 'argentina'},
          { name: 'México', value: 'mexico'},
          { name: 'Spain', value: 'spain'}
      ],
      selectedCountry: 'argentina',
      loading: true
    }
  },
  components:{
      Artist,
      Spinner
  },
  methods:{
      refreshArtists(){
          const self = this
          self.artists = [];
          self.loading = true;
          getArtists(this.selectedCountry)
            .then(function (res){
                self.loading = false;
                // console.log(artists.artist)
                self.artists = res
            })
      }
  },
  mounted: function () {
      // console.log(config.apiKey)
      this.refreshArtists()
  },
  watch: {
      selectedCountry: function (){
          this.refreshArtists()
      }
  }

}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color red !important
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
