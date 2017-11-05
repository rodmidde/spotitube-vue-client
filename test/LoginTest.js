import VueTestCase from 'petrol/core/VueTestCase';
import Login from '../src/components/Login.vue';
import { ApiGateway } from './mocks/apigateway.js'
import { LocalStorage } from './mocks/localstorage.js'
import { EventBus } from '../src/event-bus.js';

export default class LoginTest extends VueTestCase {
  beforeEach() {   
    this.SUT = this.mount(Login);
    this.SUT.apiGateway = ApiGateway
    this.SUT.localStorage = LocalStorage
  }
  /** @test */
  correct_login_and_logout_flow() {
    this.fillField('#urlInput', 'http://localhost:8080')
    this.fillField('#userInput', 'test')
    this.fillField('#passInput', 'rody')
    this.click('#loginButton')
    this.assertNotNull(this.SUT.token)
    EventBus.$emit("logged-out")
    this.assertEquals(this.SUT.token,'')        
  }
  /** @test */
  receives_no_token_when_login_credentials_are_correct() {
    this.fillField('#urlInput', 'http://localhost:8080')
    this.fillField('#userInput', 'test')
    this.fillField('#passInput', 'rody_')
    this.click('#loginButton')
    this.assertEquals(this.SUT.token,'')    
  }
}