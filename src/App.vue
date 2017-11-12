<template>
    <div id="app" class="flex-container">
        <app-header class="header flex-item"/>
        <div  class="overview flex-container">
            <playlists-overview class="flex-item playlists" v-if="token != ''"/>
            <tracks-overview class="flex-item tracks" v-if="playlistId != ''"/>
        </div>
        <login class="flex-item"/>
    </div>
</template>

<script>
  import Login from './components/Login.vue'
  import AppHeader from './components/AppHeader.vue'
  import PlaylistsOverview from './components/PlaylistsOverview.vue'
  import TracksOverview from './components/TracksOverview.vue'

  export default {
    name: 'app',
    components: {
      Login,
      AppHeader,
      TracksOverview,
      PlaylistsOverview
    },
    created () {
      this.$bus.$on('token-set', token => {
        this.token = token
      })
      this.$bus.$on('playlist-selected', ($id) => {
        this.playlistId = $id
      })
      this.$bus.$on('logged-out', () => {
        this.token = ''
        this.playlistId = ''
      })
    },
    data () {
      return {
        token: '',
        playlistId: ''
      }
    }
  }
</script>

<style scoped>
    .overview {
        height: calc(100% - 64px);
        width: 100%;
    }
</style>
