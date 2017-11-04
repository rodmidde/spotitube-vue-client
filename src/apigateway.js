import injector from 'vue-inject';
import axios from 'axios';

class ApiGateway {
    login = function(user, pass, serverlocation, callback)
    {
        this.serverlocation = serverlocation

        axios.post(this.serverlocation + "/login", {"user":user, "password":pass})
        .then(response => {
            callback(response.data.token)
        })
        .catch(e => {
          alert(e)
        })
    }

    getPlaylists = function(token, callback)
    {
        axios.get(this.serverlocation + "/playlists?token=" + token).
        then(response => {
            callback(response.data.playlists)
        })
        .catch(e => {
            alert(e)
        })
    }

    deletePlaylist = function(token, id, callback)
    {
        axios.delete(this.serverlocation + "/playlists/" + id + "?token=" + token).
        then(response => {
            callback(response.data.playlists)
        })
        .catch(e => {
            alert(e)
        })
    }

    addPlaylist = function(token, name, callback)
    {
        axios.post(this.serverlocation + "/playlists?token=" + token, {
            "id"    : -1,
            "name"  : name,
            "owner" : false
          }).
        then(response => {
            callback(response.data.playlists)
        })
        .catch(e => {
            alert(e)
        })
    }

    updatePlaylist = function(token, id, name, callback)
    {
        axios.put(this.serverlocation + "/playlists/" + id +"?token=" + token, {
            "id"    : id,
            "name"  : name,
            "owner" : false
          }).
        then(response => {
            callback(response.data.playlists)
        })
        .catch(e => {
            alert(e)
        })
    }

    getTracks = function(token, id, callback)
    {
        axios.get(this.serverlocation + "/playlists/" + id + "/tracks?token=" + token).
        then(response => {
            callback(response.data.tracks)
        })
        .catch(e => {
            alert(e)
        })
    }
}
injector.service('apiGateway', ApiGateway);