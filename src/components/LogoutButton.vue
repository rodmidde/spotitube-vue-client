<template>
    <button id="logoutButton" v-on:click="executeLogout">Logout</button>
</template>

<script>
  export default {
    name: 'logout-button',
    methods: {
      executeLogout: function () {
        this.$bus.$emit('logged-out', {})
      }
    }
  }
</script>