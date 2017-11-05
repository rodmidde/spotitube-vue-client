<template>
    <div id="new-track-modal-template">
        <modal :show="show" @close="close">
            <div class="modal-header">
                <h3>Add Track to playlist</h3>
            </div>
            <div class="modal-body">
                <select v-model="selected">
                    <!-- inline object literal -->
                    <option v-for="t in tracks" :value=t.id>{{ t.title }}</option>
                </select>
            </div>
            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="addTrackToPlaylist()">
                    Add
                </button>
            </div>
        </modal>
    </div>
</template>

<script>
  import Modal from './Modal.vue'

  export default {
    template: '#new-playlist-modal-template',
    dependencies: ['apiGateway', 'localStorage'],
    components: {Modal},
    props: ['show', 'playlistid'],
    data: function () {
      return {
        tracks: [],
        track: {},
        selected: ''
      }
    },
    created () {
      this.apiGateway.getAllTracksNotInPlaylist(this.localStorage.get('token'), this.playlistid, this.setTracks)
    },
    methods: {
      close: function () {
        this.$emit('close')
        this.name = ''
      },
      addTrackToPlaylist: function () {
        this.track = this.tracks.find(this.findTrack)
        this.apiGateway.addTrackToPlaylist(this.localStorage.get('token'), this.playlistid, this.track, this.updateTracks)
        this.close()
      },
      findTrack: function (t) {
        return t.id === this.selected
      },
      updateTracks: function (tracks) {
        this.$bus.$emit('tracks-updated', tracks)
      },
      setTracks: function (tracks) {
        this.tracks = tracks
      }
    }
  }
</script>

<style>

</style>
