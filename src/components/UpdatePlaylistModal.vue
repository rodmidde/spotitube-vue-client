<template>
    <md-dialog md-open-from="#updatePlaylistButton" md-close-to="#updatePlaylistButton" ref="updatePlaylist">
        <md-dialog-title md-dialog-title>
        Update Playlist
        </md-dialog-title>
        <md-dialog-content>

            <label class="form-label">
                Name
                <input class="form-control" v-model="name">
                <input type="hidden" v-model="id">
            </label>
        </md-dialog-content>
        <md-dialog-actions align="end">
            <button class="modal-default-button" @click="savePlaylist()">Save</button>
            <button md-button color="primary" @click="close('updatePlaylist')">Cancel</button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
  export default {
    template: '#update-playlist-modal-template',
    dependencies: ['apiGateway', 'localStorage'],
    props: ['pname', 'pid'],
    computed: {
      name: {
        get: function () {
          return this.pname
        },
        set: function (name) {
          this.newname = name
        }
      },
      id: function () {
        return this.pid
      }
    },
    data () {
      return {
        newname: ''
      }
    },
    created () {
      this.$bus.$on('updatePlaylist', ref => {
        this.$refs[ref].open()
      })
    },
    methods: {
      close: function (ref) {
        this.$refs[ref].close()
      },
      savePlaylist: function () {
        this.apiGateway.updatePlaylist(this.localStorage.get('token'), this.id, this.newname, this.updatePlaylists)
        this.close('updatePlaylist')
      },
      updatePlaylists: function (playlists, length) {
        this.$bus.$emit('playlists-updated', {'playlists': playlists, 'length': length})
      }
    }
  }
</script>

<style>

</style>
