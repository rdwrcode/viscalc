import xs from 'xstream';
import {div, span, input, makeDOMDriver} from '@cycle/dom';
import isolate from '@cycle/isolate';
import {LabeledSlider} from './LabeledSlider';

function RadiusComp(sources) {
  const props$ = xs.of({
    label: 'Radius', unit: '', min: 20, value: 50, max: 80
  });
  const childSources = {DOM: sources.DOM, props: props$};
  
  const labeledSlider = isolate(LabeledSlider)(childSources);
  const childVDom$ = labeledSlider.DOM;
  const childValue$ = labeledSlider.value;

  const vdom$ = xs.combine(childValue$, childVDom$)
    .map(([value, childVDom]) =>
      div([
        childVDom,
        div({style: {
          backgroundColor: '#58D3D8',
          width: String(value) + 'px',
          height: String(value) + 'px',
          borderRadius: String(value * 0.5) + 'px'
        }})
      ])
    );

  return {
    DOM: vdom$
  };
}

export {RadiusComp};
