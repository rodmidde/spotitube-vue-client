import VueTestCase from 'petrol/core/VueTestCase'
import AppHeader from '../src/components/AppHeader.vue'
import { EventBus } from '../src/events/event-bus.js'

export default class AppHeaderTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(AppHeader)
  }

  /** @test */
  whenLoggedOutEventReceivedTokenGetsCleared () {
    EventBus.$emit('logged-out')
    this.assertEquals('', this.SUT.token)
  }

  /** @test */
  whenLoggedInEventReceivedTokenGetsSet () {
    EventBus.$emit('token-set', {'token': 'tokentje', user: '', serverlocation: ''})
    this.assertEquals('tokentje', this.SUT.token)
  }
}
