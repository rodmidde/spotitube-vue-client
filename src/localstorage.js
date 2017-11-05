import Vue from 'vue'
import injector from 'vue-inject'

export class LocalStorage {
  set (key, value) {
    Vue.localStorage.set(key, value)
  }

  get (key) {
    return Vue.localStorage.get(key)
  }

  remove (key) {
    return Vue.localStorage.remove(key)
  }
}

injector.service('localStorage', LocalStorage)
