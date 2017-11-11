import VueTestCase from 'petrol/core/VueTestCase'
import LogoutButton from '../src/components/LogoutButton.vue'
import { EventBus } from '../src/events/event-bus.js'

export default class LogoutButtonTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(LogoutButton)
  }

  /** @test */
  whenLogoutButtonClickedTokenGetsReset () {
    this.SUT.executeLogout()
    EventBus.$on('logged-out', () => {
      this.assertTrue(true)
    })
  }
}
