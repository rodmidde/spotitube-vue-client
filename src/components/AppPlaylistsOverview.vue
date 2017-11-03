<template>
    <div id="app-playlists-overview" class="content flex-container" fxLayout="row" fxLayoutAlign="center">
        Playlists

        <ul>
        <li v-for="playlist in playlists">
            <a href="#" v-on:click="showTracks(playlist.id)">{{ playlist.name }}</a>
            <button v-on:click="executeUpdate(playlist.id)">Update</button>
            <button v-on:click="executeDelete(playlist.id)">Delete</button>
       </li>
        </ul>

        <button v-on:click="executeAdd">Add Playlist</button>
    </div>
</template>

<script>
export default {
  name: "app-playlists-overview",
  dependencies: ["apiGateway", "localStorage"],

  created() {
    this.apiGateway.getPlaylists(this.localStorage.get("token"), this.setPlaylists)
  },
  data() {
    return {
      playlists: []
    };
  },
  methods: {
      setPlaylists : function(playlists)
      {
          this.playlists = playlists;
      },

      showTracks : function(id)
      {
        this.$bus.$emit('playlist-selected', id)
      },

      executeUpdate: function(id)
      {
        alert(id)
      },

      executeDelete: function(id)
      {
        this.apiGateway.deletePlaylist(this.localStorage.get("token"), id, this.setPlaylists)   
      },

      executeAdd: function()
      {
        alert("Add")
      }
  }
};
</script>