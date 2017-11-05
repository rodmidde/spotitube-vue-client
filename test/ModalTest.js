/* eslint-disable no-undef */
import VueTestCase from 'petrol/core/VueTestCase'
import Modal from '../src/components/Modal.vue'

export default class ModalTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(Modal)
  }

  /** @test */
  escapeCallsClose () {
    this.SUT.show = true
    var e = new Event('keydown')
    e.key = ''
    e.keyCode = 27
    e.which = e.keyCode
    e.altKey = false
    e.ctrlKey = true
    e.shiftKey = false
    e.metaKey = false
    document.dispatchEvent(e)
  }
}
