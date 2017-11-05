import VueTestCase from 'petrol/core/VueTestCase'
import NewTrackModal from '../src/components/NewTrackModal.vue'
import Vue from 'vue'
import injector from 'vue-inject'

Vue.use(injector)
require('./mocks/apigateway.js')
require('./mocks/localstorage.js')

export default class NewTrackModalTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(NewTrackModal)
  }

  /** @test */
  onLoadTracksAreRetrievedFromGateway () {
    this.assertEquals(3, this.SUT.tracks.length)
  }

  /** @test */
  whenTrackAddedModalGetsClosed () {
    this.SUT.selected = 1
    this.SUT.addTrackToPlaylist()
  }

}
