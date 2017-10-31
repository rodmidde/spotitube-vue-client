<template>
  <div id="login" v-if="token == ''" class="content flex-container" fxLayout="row" fxLayoutAlign="center">
    <div class="flex-container" fxLayout="column">
      <div class="flex-item">
        <input id="urlInput" placeholder="Server URL" v-model="serverlocation" pattern="http://[a-zA-Z0-9:/.\-]+" required>
      </div>

      <div class="flex-item">
        <input placeholder="User" v-model="user" required>
      </div>

      <div class="flex-item">
        <input type="password" placeholder="Password" v-model="password" required>
      </div>
      <button v-on:click="executeLogin">Login</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { EventBus } from '../event-bus.js';

export default {
  name: "login",
  dependencies: ["apiGateway", "localStorage"],

  created() {
    EventBus.$on("logged-out", obj => {
      this.token = '';
      this.localStorage.remove("token");
    })
  }, 
  data() {
    return {
      user: "",
      pass: "",
      serverlocation: "",
      token: ""
    };
  },
  methods: {
    executeLogin: function() {
      this.apiGateway.login(this.user, this.pass, this.serverlocation, this.setToken);
    },
    setToken: function(token) {
      this.localStorage.set("token", token);
      this.token = token;
      EventBus.$emit('token-set', token)
    }
  }
};
</script>

<style scoped>

</style>
