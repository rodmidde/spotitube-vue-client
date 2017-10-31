import injector from 'vue-inject';
import Vue from 'vue'

class LocalStorage {
    set = function(key, value){
        Vue.localStorage.set(key, value)
    }

    get = function(key) {
        return Vue.localStorage.get(key)
    }

    remove = function(key) {
        return Vue.localStorage.remove(key)
    }
}
injector.service('localStorage', LocalStorage);