import xs from 'xstream'
//import {UserInput} from './UserInput'
//import {RadiusComp} from './RadiusComp'
//import {Animation} from './Animation'
//import {AnimatedLetter} from './AnimatedLetter'
import {List} from './List'

export function App(sources) {
  //const sinks = UserInput(sources);
  //const sinks = RadiusComp(sources);

  // requires a Keydown with the run in index.js
  //Keydown: () => from Event(document, 'keydown'),
  //const sinks = AnimatedLetter(sources);
  
  const sinks = List(sources);
  return sinks;
}
