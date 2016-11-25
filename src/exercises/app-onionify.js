import xs from 'xstream'
import {div, span, input, h2} from '@cycle/dom'
import onionify from 'cycle-onionify'

//import {counter} from './counter'
//import {CheckboxToggle} from './CheckboxToggle'

import {BMIComp} from './BMIComp'

function Main (sources) {
  const state$ = sources.onion.state$;
  const vdom$ = state$.map(state => h2('hi seconds '+state));

  const initialReducer$ = xs.of(function initialReducer() { return 0; });
  const addOneReducer$ = xs.periodic(1000)
    .mapTo(function addOneReducer(prev) { return prev + 1; });
  const reducer$ = xs.merge(initialReducer$, addOneReducer$);

  return {
    DOM: vdom$,
    onion: reducer$,
  };  
}

export const App = onionify(Main); 