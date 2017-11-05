<template>
    <div id="app-header" class="modal-header" fxLayout="row" fxLayoutAlign="center">
        <h3>Welkom bij Spotitube!</h3>
        <logout-button v-if="token!==''"></logout-button>
    </div>
</template>

<script>
  import LogoutButton from './LogoutButton.vue'
  export default {
    name: 'app-header',
    components: { LogoutButton },
    created () {
      this.$bus.$on('token-set', token => {
        this.token = token
      })
      this.$bus.$on('logged-out', obj => {
        this.token = ''
      })
    },
    data () {
      return {
        token: ''
      }
    }
  }
</script>

<style scoped>

</style>
