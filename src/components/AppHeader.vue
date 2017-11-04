<template>
    <div id="app-header" class="modal-header" fxLayout="row" fxLayoutAlign="center">
        <h3>Welkom bij Spotitube!</h3>
        <button v-on:click="executeLogout" v-if="token!=''">Logout</button>
    </div>
</template>

<script>
import Vue from 'vue'
import { EventBus } from '../event-bus.js';

export default {
  name: "app-header",
  dependencies: ["apiGateway"],

  created() {
    EventBus.$on('token-set', token => {
        this.token = token;
    });
  },

  data() {
    return {
      token: "",
    };
  },
  methods: {
    executeLogout: function() {
      this.token = '';
      EventBus.$emit('logged-out', {})
    }
  }
};
</script>

<style scoped>

</style>
