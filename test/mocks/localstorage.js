export class LocalStorage {
    static set = function(key, value){
        this.key = value;
    }

    static get = function(key) {
        return this[key];
    }

    static remove = function(key) {
        this[key] = undefined
    }
}