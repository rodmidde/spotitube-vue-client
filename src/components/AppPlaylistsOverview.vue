<template>
    <div id="app-playlists-overview" class="modal-header" fxLayout="row" fxLayoutAlign="center">
        <h3>Playlists</h3>

        <ul>
            <li v-for="playlist in playlists">
                <a href="#" v-on:click="showTracks(playlist.id)">{{ playlist.name }}</a>
                <button v-on:click="executeUpdate(playlist.id, playlist.name)">Update</button>
                <button v-on:click="executeDelete(playlist.id)">Delete</button>
            </li>
        </ul>
        <new-playlist-modal :show="showNewPlaylistModal" @close="showNewPlaylistModal = false"></new-playlist-modal>
        <update-playlist-modal :show="updatePlaylistModal" @close="updatePlaylistModal = false" :pid="id"
                               :pname="name"></update-playlist-modal>

        <button @click="showNewPlaylistModal = true">Add Playlist</button>
    </div>
</template>

<script>
  import NewPlaylistModal from './NewPlaylistModal.vue'
  import UpdatePlaylistModal from './UpdatePlaylistModal.vue'

  export default {
    name: 'app-playlists-overview',
    dependencies: ['apiGateway', 'localStorage'],

    components: {
      NewPlaylistModal, UpdatePlaylistModal
    },

    created () {
      this.apiGateway.getPlaylists(this.localStorage.get('token'), this.setPlaylists)

      this.$bus.$on('playlists-updated', playlists => {
        this.setPlaylists(playlists)
      })
    },
    data () {
      return {
        playlists: [],
        showNewPlaylistModal: false,
        updatePlaylistModal: false,
        id: '',
        name: ''
      }
    },
    methods: {
      setPlaylists: function (playlists) {
        this.playlists = playlists
      },

      showTracks: function (id) {
        this.$bus.$emit('playlist-selected', id)
      },

      executeUpdate: function (id, name) {
        this.id = id
        this.name = name
        this.updatePlaylistModal = true
      },

      executeDelete: function (id) {
        this.apiGateway.deletePlaylist(this.localStorage.get('token'), id, this.setPlaylists)
      }
    }
  }
</script>