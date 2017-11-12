import VueTestCase from 'petrol/core/VueTestCase'
import NewTrackModal from '../src/components/NewTrackModal.vue'
import Vue from 'vue'
import injector from 'vue-inject'
import {EventBus} from '../src/events/event-bus'

Vue.use(injector)
require('./stubs/apigateway.js')
require('./stubs/localstorage.js')

export default class NewTrackModalTest extends VueTestCase {
  beforeEach () {
    this.SUT = this.mount(NewTrackModal)
    this.SUT.$refs = []
    this.SUT.$refs['newTrack'] = {
      closed: false,
      open: function () {
        this.closed = false
      },
      close: function () {
        this.closed = true
      }
    }
  }

  /** @test */
  onLoadTracksAreRetrievedFromGateway () {
    EventBus.$emit('openNewTrack', 'newTrack')
    this.assertEquals(3, this.SUT.tracks.length)
    this.assertFalse(this.SUT.$refs['newTrack'].closed)
  }

  /** @test */
  whenTrackAddedModalGetsClosed () {
    this.SUT.selected = 1
    this.SUT.addTrackToPlaylist()
    this.assertTrue(this.SUT.$refs['newTrack'].closed)
  }

}
