<template>
  <div id="app">
    <app-header class="flex-item" fxFlexAlign="center"></app-header>
    
    <app-playlists-overview class="flex-item" fxFlexAlign="center" v-if="token != ''"></app-playlists-overview>

    <app-tracks-overview class="flex-item" fxFlexAlign="center" v-if="playlistId != ''"></app-tracks-overview>

    <login class="flex-item" fxFlexAlign="center"></login>
  </div>  
</template>

<script>
import Login from './components/Login.vue'
import AppHeader from './components/AppHeader.vue'
import AppPlaylistsOverview from './components/AppPlaylistsOverview.vue'
import AppTracksOverview from './components/AppTracksOverview.vue'

export default {
  name: 'app',
  components: {
    Login,
    AppHeader,
    AppTracksOverview,
    AppPlaylistsOverview
  },
  created() {
    this.$bus.$on('token-set', token => {
        this.token = token;
    });
    this.$bus.$on('playlist-selected', ($id) => {
        this.playlistId = $id;
    });
    this.$bus.$on("logged-out", obj => {
        this.token = '';
        this.playlistId = '';
    })
  },
  data() {
    return {
      token: "",
      playlistId: ""
    };
  },
}
</script>

