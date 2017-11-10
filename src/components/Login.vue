<template>
    <div id="login" v-if="token == ''">
        <md-card>
            <md-card-content>
            <div class="form-control">
                <label class="form-label">
                    Server URL
                    <input id="urlInput" class="form-control" placeholder="Server URL" v-model="serverlocation"
                           pattern="http://[a-zA-Z0-9:/.\-]+" required>
                </label>
                <label class="form-label">
                    User
                    <input id="userInput" placeholder="User" class="form-control" v-model="user" required>
                </label>
                <label class="form-label">
                    Password
                    <input id="passInput" type="password" class="form-control" placeholder="Password" v-model="pass"
                           required>
                </label>
                <button id="loginButton" v-on:click="executeLogin">Login</button>
            </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
  export default {
    name: 'login',
    dependencies: ['apiGateway', 'localStorage'],
    created () {
      this.$bus.$on('logged-out', obj => {
        this.token = ''
        this.localStorage.remove('token')
      })
    },
    data () {
      return {
        user: '',
        pass: '',
        serverlocation: '',
        token: ''
      }
    },
    methods: {
      executeLogin: function () {
        this.apiGateway.login(this.user, this.pass, this.serverlocation, this.setToken)
      },
      setToken: function (token) {
        this.localStorage.set('token', token)
        this.token = token
        this.$bus.$emit('token-set', {'token': this.token, 'user': this.user, 'serverlocation': this.serverlocation})
      }
    }
  }
</script>

<style scoped>

</style>
