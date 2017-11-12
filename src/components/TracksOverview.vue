<template>
    <md-card class="flex-item">

    <div id="tracks-overview" class="modal-header">
        <h3>Tracks</h3>

        <ul class="flex-container">
        <li v-for="track in tracks" class="flex-item flex-container">
            <span class="playlist-name">{{ track.title }}</span>
            <button v-on:click="executeDelete(track.id)"><md-icon>delete</md-icon></button>
        </li>
        </ul>
        <button @click="openDialog('newTrack')" class="add-button" id="openNewTrackButton">
            <md-icon>add</md-icon>
        </button>
    </div>
    <new-track-modal :playlistid="playlistId"></new-track-modal>
    </md-card>
</template>

<script>
import NewTrackModal from './NewTrackModal.vue'

export default {
  name: 'tracks-overview',
  dependencies: ['apiGateway', 'localStorage'],
  components: { NewTrackModal },
  created () {
    this.$bus.$on('playlist-selected', ($id) => {
      this.playlistId = $id
      if (this.playlistId !== '') {
        this.apiGateway.getTracks(this.localStorage.get('token'), this.playlistId, this.setTracks)
      }
    })
    this.$bus.$on('tracks-updated', (tracks) => {
      this.setTracks(tracks)
      this.apiGateway.getPlaylists(this.localStorage.get('token'), this.setPlaylists)
    })
  },
  data () {
    return {
      tracks: [],
      playlistId: ''
    }
  },
  methods: {
    openDialog (ref) {
      this.$bus.$emit('openNewTrack', ref)
    },
    setTracks: function (tracks) {
      this.tracks = tracks
    },
    executeDelete: function (id) {
      this.apiGateway.removeTrackFromPlaylist(this.localStorage.get('token'), this.playlistId, id, this.setTracks)
      this.$bus.$emit('tracks-updated', this.tracks)
    },
    setPlaylists: function (playlists, length) {
      this.$bus.$emit('playlists-updated', {'playlists': playlists, 'length': length})
    }
  }
}
</script>