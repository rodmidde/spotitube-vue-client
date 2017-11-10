<template>
    <md-toolbar>
        <div id="app-header">
            <span class="title">
                <md-icon>queue_music</md-icon>Welkom bij Spotitube!
            </span>
            <div v-if="user && serverlocation"
                 class="mat-body-2">
                {{user}}@{{serverlocation}}
            </div>
            <md-menu x-position="before" y-position="below">
                <button md-icon-button md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                </button>
                <md-menu-content>
                    <logout-button v-if="token!==''"></logout-button>
                </md-menu-content>
            </md-menu>
        </div>
    </md-toolbar>
</template>

<script>
  import LogoutButton from './LogoutButton.vue'

  export default {
    name: 'app-header',
    components: {LogoutButton},
    created () {
      this.$bus.$on('token-set', userCredentials => {
        this.token = userCredentials.token
        this.user = userCredentials.user
        this.serverlocation = userCredentials.serverlocation
      })
      this.$bus.$on('logged-out', obj => {
        this.token = ''
        this.user = ''
        this.serverlocation = ''
      })
    },
    data () {
      return {
        token: '',
        user: '',
        serverlocation: ''
      }
    }
  }
</script>
