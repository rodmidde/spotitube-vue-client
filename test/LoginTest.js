import VueTestCase from 'petrol/core/VueTestCase'
import Login from '../src/components/Login.vue'
import {EventBus} from '../src/events/event-bus.js'
import Vue from 'vue'
import injector from 'vue-inject'

Vue.use(injector)
require('./mocks/apigateway.js')
require('./mocks/localstorage.js')

export default class LoginTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(Login)
  }

  /** @test */
  correctLoginAndLogoutFlow () {
    this.fillField('#urlInput', 'http://localhost:8080')
    this.fillField('#userInput', 'test')
    this.fillField('#passInput', 'rody')
    this.click('#loginButton')
    this.assertNotNull(this.SUT.token)
    EventBus.$emit('logged-out')
    this.assertEquals(this.SUT.token, '')
  }

  /** @test */
  receivesNoTokenWhenLoginCredentialsAreIncorrect () {
    this.fillField('#urlInput', 'http://localhost:8080')
    this.fillField('#userInput', 'test')
    this.fillField('#passInput', 'rody_')
    this.click('#loginButton')
    this.assertEquals(this.SUT.token, '')
  }
}
