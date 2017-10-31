import injector from 'vue-inject';
import axios from 'axios';

class ApiGateway {
    login = function(user, pass, serverlocation, callback)
    {
        axios.post(serverlocation + "/login", {"user":user, "password":pass})
        .then(response => {
            callback(response.data.token)
        })
        .catch(e => {
          alert(e)
        })
    }
}
injector.service('apiGateway', ApiGateway);