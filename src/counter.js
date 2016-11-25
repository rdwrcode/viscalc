import xs from 'xstream';
import {div, button, p, makeDOMDriver} from '@cycle/dom';

function counter(sources) {
  const action$ = xs.merge(
    sources.DOM.select('.dec').events('click').mapTo(-1),
    sources.DOM.select('.inc').events('click').mapTo(+1)
  );

  const count$ = action$.fold((x, y) => x + y, 0);

  const vdom$ = count$.map(count =>
    div([
      button('.dec', 'Decrement'),
      button('.inc', 'Increment'),
      p('Counter: ' + count)
    ])
  );

  const sinks = {
    DOM: vdom$
  };

  return sinks;
}

export {counter};