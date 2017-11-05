import injector from 'vue-inject'

export class LocalStorage {
  set (key, value) {
    this.key = value
  }

  get (key) {
    return this[key]
  }

  remove (key) {
    this[key] = undefined
  }
}

injector.service('localStorage', LocalStorage)
