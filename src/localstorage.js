import Vue from 'vue'
import injector from 'vue-inject';

export class LocalStorage {
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
//Vue.$ioc.register('localStorage', LocalStorage);
injector.service('localStorage', LocalStorage);
