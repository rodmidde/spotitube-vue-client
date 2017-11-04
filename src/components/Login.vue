<template>
  <div id="login" v-if="token == ''" class="content flex-container" fxLayout="row" fxLayoutAlign="center">
    <div class="form-control">
        <label class="form-label">
                    Server URL
          <input id="urlInput" class="form-control" placeholder="Server URL" v-model="serverlocation" pattern="http://[a-zA-Z0-9:/.\-]+" required>
        </label>
        <label class="form-label">
                    User
          <input placeholder="User" class="form-control" v-model="user" required>
        </label>
        <label class="form-label">
                    Password
          <input type="password" class="form-control" placeholder="Password" v-model="pass" required>
        </label>
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
