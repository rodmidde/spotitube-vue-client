<template>
    <div id="update-playlist-modal-template">
        <modal :show="show" @close="close">
            <div class="modal-header">
                <h3>Update Playlist</h3>
            </div>
            <div class="modal-body">
                <label class="form-label">
                    Name
                    <input class="form-control" v-model="name">
                    <input type="hidden" v-model="id">
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
  template: '#update-playlist-modal-template',
  dependencies: ["apiGateway", "localStorage"],
  components: {
      Modal
  },
  props: ['show', 'pname', 'pid'],
  computed: {
    name: {
        get: function () {
            return this.pname;
        },
        set: function(name) {
            this.newname = name;
        }
    },
    id: function() {
        return this.pid;
    }
  },
  data() {
      return {
          newname: ''
      }
  },
  methods: {
    close: function () {
      this.$emit('close');
    },
    savePlaylist: function () {
        this.apiGateway.updatePlaylist(this.localStorage.get("token"), this.id, this.newname, this.updatePlaylists)
        this.close();
    },
    updatePlaylists: function(playlists)
    {
        this.$bus.$emit("playlists-updated", playlists)
    }
  }  
}
</script>

<style>

</style>
