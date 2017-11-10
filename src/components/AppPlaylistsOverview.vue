<template>
    <div id="app-playlists-overview" class="modal-header">
        <h3>Playlists</h3>

        <md-card class="flex-item">
            <md-card-content>
            <ul class="flex-container">
                <li v-for="playlist in playlists" class="flex-item flex-container">
                    <a href="#" v-on:click="showTracks(playlist.id)" class="playlist-name">{{ playlist.name }}</a>
                    <button md-button v-on:click="executeUpdate(playlist.id, playlist.name)"><md-icon>edit</md-icon></button>
                    <button v-on:click="executeDelete(playlist.id)"><md-icon>delete</md-icon></button>
                </li>
            </ul>
            </md-card-content>
        </md-card>
        <md-card class="flex-item">
            <md-card-content class="flex-container">
                <span class="length">
                Total length: {{minutes}}
                </span>
                <button @click="openDialog('newPlaylist')" class="add-button" id="openNewPlaylistButton">
                    <md-icon>playlist_add</md-icon>
                </button>
            </md-card-content>
        </md-card>
        <new-playlist-modal></new-playlist-modal>
        <update-playlist-modal :pid="id" :pname="name"></update-playlist-modal>
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

      this.$bus.$on('playlists-updated', obj => {
        this.setPlaylists(obj.playlists, obj.length)
      })
    },
    data () {
      return {
        playlists: [],
        id: '',
        name: '',
        minutes: ''
      }
    },
    methods: {
      openDialog (ref) {
        this.$bus.$emit('openNewPlaylist', ref)
      },
      toMinutes: function (length) {
        const date = new Date(null)
        date.setSeconds(length)
        const minutes = date.toISOString().substr(11, 8)

        return minutes
      },

      setPlaylists: function (playlists, length) {
        this.playlists = playlists
        this.minutes = this.toMinutes(length)
      },

      showTracks: function (id) {
        this.$bus.$emit('playlist-selected', id)
      },

      executeUpdate: function (id, name) {
        this.id = id
        this.name = name
        this.updatePlaylistModal = true
        this.$bus.$emit('updatePlaylist', 'updatePlaylist')
      },

      executeDelete: function (id) {
        this.apiGateway.deletePlaylist(this.localStorage.get('token'), id, this.setPlaylists)
        this.$bus.$emit('playlist-selected', '')
      }
    }
  }
</script>
