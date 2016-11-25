import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
//import {makeHTTPDriver} from '@cycle/http'
//import fromEvent from 'xstream/extra/fromEvent'
//import {makeAnimationDriver} from 'cycle-animation-driver'
import {App} from './app'

const main = App

// HTTP: makeHTTPDriver() is required for get RandomUser
// Keydown: () => fromEvent(document, 'keydown'),
const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
