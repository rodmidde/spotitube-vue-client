<template>
  <div id="app">
    <app-header class="flex-item" fxFlexAlign="center"></app-header>
    
    <app-playlists-overview class="flex-item" fxFlexAlign="center"></app-playlists-overview>

    <login class="flex-item" fxFlexAlign="center"></login>
  </div>  
</template>

<script>
import Login from './components/Login.vue'
import AppHeader from './components/AppHeader.vue'
import AppPlaylistsOverview from './components/AppPlaylistsOverview.vue'

export default {
  name: 'app',
  components: {
    Login,
    AppHeader,
    AppPlaylistsOverview
  }
}
</script>

