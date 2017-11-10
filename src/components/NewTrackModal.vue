<template>
    <md-dialog md-open-from="#openNewTrackButton" md-close-to="#openNewTrackButton" ref="newTrack">
            <md-dialog-title md-dialog-title>
            Add Track To Playlist
            </md-dialog-title>
            <md-dialog-content>
                <select v-model="selected">
                    <!-- inline object literal -->
                    <option v-for="t in tracks" :value=t.id>{{ t.title }}</option>
                </select>
            </md-dialog-content>

            <md-dialog-actions align="end">
                <button class="modal-default-button" @click="addTrackToPlaylist()">Add</button>
                <button md-button color="primary" @click="close('newTrack')">Cancel</button>
            </md-dialog-actions>
    </md-dialog>
</template>

<script>
  export default {
    template: '#new-playlist-modal-template',
    dependencies: ['apiGateway', 'localStorage'],
    props: ['playlistid'],
    data: function () {
      return {
        tracks: [],
        track: {},
        selected: ''
      }
    },
    created () {
      this.$bus.$on('openNewTrack', ref => {
        this.$refs[ref].open()
        this.apiGateway.getAllTracksNotInPlaylist(this.localStorage.get('token'), this.playlistid, this.setTracks)
      })
    },
    methods: {
      close: function (ref) {
        this.$refs[ref].close()
      },
      addTrackToPlaylist: function () {
        this.track = this.tracks.find(this.findTrack)
        this.apiGateway.addTrackToPlaylist(this.localStorage.get('token'), this.playlistid, this.track, this.updateTracks)
        this.close('newTrack')
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
