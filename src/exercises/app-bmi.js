import xs from 'xstream'
import {div, span, input, h2} from '@cycle/dom';
import isolate from '@cycle/isolate';

function LabeledSlider(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value);

  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        value: val,
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state =>
      div('.labeled-slider', [
        span('.label',
          state.label + ' ' + state.value + state.unit
        ),
        input('.slider', {
          attrs: {type: 'range', min: state.min, max: state.max, value: state.value}
        })
      ])
    );

  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value),
  };
  return sinks;
}

function bmi(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

function BMIComp(sources) {
  const weightProps$ = xs.of({
    label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150
  });

  const heightProps$ = xs.of({
    label: 'Height', unit: 'cm', min: 140, value: 170, max: 210
  });

  const weightSources = {DOM: sources.DOM, props: weightProps$};
  const heightSources = {DOM: sources.DOM, props: heightProps$};

  const weightSlider = isolate(LabeledSlider)(weightSources);
  const heightSlider = isolate(LabeledSlider)(heightSources);

  const weightVDom$ = weightSlider.DOM;
  const weightValue$ = weightSlider.value;

  const heightVDom$ = heightSlider.DOM;
  const heightValue$ = heightSlider.value;

  const bmi$ = xs.combine(weightValue$, heightValue$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return bmi;
    })
    .remember();

  const vdom$ = xs.combine(bmi$, weightVDom$, heightVDom$)
    .map(([bmi, weightVDom, heightVDom]) =>
      div([
        weightVDom,
        heightVDom,
        h2('BMI is ' + bmi)
      ])
    );

  return {
    DOM: vdom$
  };
}

export function App (sources) {
  const sinks = BMIComp(sources);

  return sinks;
}
