import axios from 'axios'
import injector from 'vue-inject'

export class ApiGateway {
  login (user, pass, serverlocation, callback) {
    this.serverlocation = serverlocation

    axios.post(this.serverlocation + '/login', {
      'user': user,
      'password': pass
    })
      .then(response => {
        callback(response.data.token)
      })
      .catch(e => {
        console.log(e)
      })
  }

  getPlaylists (token, callback) {
    axios.get(this.serverlocation + '/playlists?token=' + token)
      .then(response => {
        callback(response.data.playlists)
      })
      .catch(e => {
        console.log(e)
      })
  }

  deletePlaylist (token, id, callback) {
    axios.delete(this.serverlocation + '/playlists/' + id + '?token=' + token)
      .then(response => {
        callback(response.data.playlists)
      })
      .catch(e => {
        console.log(e)
      })
  }

  addPlaylist (token, name, callback) {
    axios.post(this.serverlocation + '/playlists?token=' + token, {
      'id': -1,
      'name': name,
      'owner': false
    })
      .then(response => {
        callback(response.data.playlists)
      })
      .catch(e => {
        console.log(e)
      })
  }

  updatePlaylist (token, id, name, callback) {
    axios.put(this.serverlocation + '/playlists/' + id + '?token=' + token, {
      'id': id,
      'name': name,
      'owner': false
    })
      .then(response => {
        callback(response.data.playlists)
      })
      .catch(e => {
        console.log(e)
      })
  }

  getTracks (token, id, callback) {
    axios.get(this.serverlocation + '/playlists/' + id + '/tracks?token=' + token)
      .then(response => {
        callback(response.data.tracks)
      })
      .catch(e => {
        console.log(e)
      })
  }
}

// Vue.$ioc.register('apiGateway', ApiGateway);
injector.service('apiGateway', ApiGateway)
