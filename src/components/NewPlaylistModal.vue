<template>
    <md-dialog md-open-from="#openNewPlaylistButton" md-close-to="#openNewPlaylistButton" ref="newPlaylist">
        <md-dialog-title md-dialog-title>
            Add Playlist
        </md-dialog-title>
        <md-dialog-content>
                <label class="form-label">
                    Name<input v-model="name" class="form-control">
                </label>
        </md-dialog-content>

        <md-dialog-actions align="end">
            <button class="modal-default-button" @click="savePlaylist()">Save</button>
            <button md-button color="primary" @click="close('newPlaylist')"> Cancel</button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
  export default {
    template: '#new-playlist-modal-template',
    dependencies: ['apiGateway', 'localStorage'],
    data: function () {
      return {
        name: ''
      }
    },
    created () {
      this.$bus.$on('openNewPlaylist', ref => {
        this.$refs[ref].open()
      })
    },
    methods: {
      close: function (ref) {
        this.$refs[ref].close()
      },
      savePlaylist: function () {
        this.apiGateway.addPlaylist(this.localStorage.get('token'), this.name, this.updatePlaylists)
        this.close('newPlaylist')
      },
      updatePlaylists: function (playlists, length) {
        this.$bus.$emit('playlists-updated', {'playlists': playlists, 'length': length})
      }
    }
  }
</script>

<style>

</style>
