<template>
    <div id="app-tracks-overview" class="content flex-container" fxLayout="row" fxLayoutAlign="center">
        Tracks

        <ul>
        <li v-for="track in tracks">
            {{ track.title }}
        </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "app-tracks-overview",
  dependencies: ["apiGateway", "localStorage"],

  created() {
    this.$bus.$on('playlist-selected', ($id) => {
      this.playlistId = $id
      this.apiGateway.getTracks(this.localStorage.get("token"), this.playlistId, this.setTracks)
    })
  },
  data() {
    return {
      tracks: [], 
      playlistId: ''
    };
  },
  methods: {
      setTracks : function(tracks)
      {
          this.tracks = tracks;
      }
  }
};
</script>