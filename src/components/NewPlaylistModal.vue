<template>
    <div id="new-playlist-modal-template">
        <modal :show="show" @close="close">
            <div class="modal-header">
                <h3>New Playlist</h3>
            </div>
            <div class="modal-body">
                <label class="form-label">
                    Name
                    <input v-model="name" class="form-control">
                </label>
            </div>
            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="savePlaylist()">
                    Save
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
    props: ['show'],
    data: function () {
      return {
        name: ''
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
        this.name = ''
      },
      savePlaylist: function () {
        this.apiGateway.addPlaylist(this.localStorage.get('token'), this.name, this.updatePlaylists)
        this.close()
      },
      updatePlaylists: function (playlists) {
        this.$bus.$emit('playlists-updated', playlists)
      }
    }
  }
</script>

<style>

</style>
