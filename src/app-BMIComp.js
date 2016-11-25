import xs from 'xstream'
//import {counter} from './counter'
//import {CheckboxToggle} from './CheckboxToggle'
import {BMIComp} from './BMIComp'

export function App (sources) {
  const sinks = BMIComp(sources)
  return sinks;  
}
