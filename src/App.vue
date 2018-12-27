<template >
<div id="app">
    <img class="logo" src="https://donaldolog.github.io/lastfm/dist/last-fm-lg.png"/>
      <h1>Music</h1>
      <spinner v-show="loading"></spinner>
      <div class="">
          <div style="margin: auto;" class="col-md-2">
            <v-select v-model="selectedCountry" :options="countries"></v-select>
          </div>
          <div class="form-group">
              <ul class="row from-group">
            <li class="artist col-md-3" v-for="artist in artists">
              <h2>
                  <a target="_blank">{{artist.name}}</a>
              </h2>
              <img :src="artist.image[2]['#text']" @click="getInfo(artist.mbid)"/>
            </li>
          </ul>
          </div>
      </div>
      <div>

        <b-modal v-model="modalInfo" size="lg" centered  ok-only>
            <div slot="modal-header">
                <h5 class="modal-title">{{artistInfo.name}}</h5>
            </div>
            <img align="left" :src="artistInfo.imagen" alt="">
            <p>Listeners: {{artistInfo.listeners}}</p>
            <p>Playcount: {{artistInfo.playCount}}</p>
            <p align="justify" v-html="artistInfo.content"> {{artistInfo.content}}</p>
              <div slot="modal-footer" class="w-100">
               <b-btn size="sm" class="float-right" variant="primary" @click="enviarModal()">
                 Cerrar
               </b-btn>
             </div>
        </b-modal>
      </div>
</div>
</template>

<script>
import {getArtists} from './api'
import {getArtistInfo} from './api'
import config from './api/config'
import Artist from './components/Artist.vue'
import Spinner from './Spinner.vue'
import Vue from 'vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
          { label: 'Argentina', value: 'argentina'},
          { label: 'México', value: 'mexico'},
          { label: 'Spain', value: 'spain'}
      ],
      selectedCountry: { label: 'Argentina', value: 'argentina'    },
      loading: true,
      modalInfo: false,
      artistInfo: {
          name: '',
          listeners: '0',
          playCount: '',
          content: '',
          published: '',
          imagen: ''
      }
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
          getArtists(this.selectedCountry.value)
            .then(function (res){
                self.loading = false
                // console.log(res)
                self.artists = res
            })
      },
      getInfo(mb){
          const self = this
          self.loading = true;

          getArtistInfo(mb)
          .then(function(res){
              console.log(res);
              self.artistInfo.name = res.name;
              self.artistInfo.listeners = res.stats.listeners;
              self.artistInfo.playCount = res.stats.playcount;
              self.artistInfo.content = res.bio.content;
              self.artistInfo.published = res.published;
              self.artistInfo.imagen = res.image[3]['#text'];
              self.modalInfo = !self.modalInfo
              self.loading = false;

          });
      },
      enviarModal(){
          const self = this
          self.modalInfo = false
          console.log('enviarModal')

      }
  },
  mounted: function () {
      console.log(this.artistInfo.listeners)
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
  /* color red !important */
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0


a
  color #42b983

.logo
  width auto
  height 120px

li.artist
  display block
  margin 50px 0
</style>
