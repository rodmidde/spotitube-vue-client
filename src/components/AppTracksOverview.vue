<template>
    <div id="app-tracks-overview" class="modal-header" fxLayout="row" fxLayoutAlign="center">
        <h3>Tracks</h3>

        <ul>
        <li v-for="track in tracks">
            {{ track.title }}
            <button v-on:click="executeDelete(track.id)">Delete from playlist</button>
        </li>
        </ul>
        <new-track-modal :show="showAddTrackModal" @close="showAddTrackModal = false" :playlistid="playlistId" v-if="showAddTrackModal"></new-track-modal>
        <button @click="showAddTrackModal = true">Add Track to playlist</button>
    </div>
</template>

<script>
import NewTrackModal from './NewTrackModal.vue'

export default {
  name: 'app-tracks-overview',
  dependencies: ['apiGateway', 'localStorage'],
  components: { NewTrackModal },
  created () {
    this.$bus.$on('playlist-selected', ($id) => {
      this.playlistId = $id
      this.apiGateway.getTracks(this.localStorage.get('token'), this.playlistId, this.setTracks)
    })
    this.$bus.$on('tracks-updated', (tracks) => {
      this.setTracks(tracks)
    })
  },
  data () {
    return {
      tracks: [],
      playlistId: '',
      showAddTrackModal: false
    }
  },
  methods: {
    setTracks: function (tracks) {
      this.tracks = tracks
    },
    executeDelete: function (id) {
      this.apiGateway.removeTrackFromPlaylist(this.localStorage.get('token'), this.playlistId, id, this.setTracks)
    }
  }
}
</script>