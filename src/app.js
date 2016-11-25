import xs from 'xstream'
import {List} from './List'
import './app.css';

export function App(sources) {
  const sinks = List(sources);

  return sinks;
}
