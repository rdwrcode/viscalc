import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {div, input, h2, makeDOMDriver} from '@cycle/dom';

function renderSlider(label, value, unit, className, min, max) {
  return div([
    '' + label + ' ' + value + unit,
    input('.' + className, {type: 'range', min, max, value})
  ]);
}

function renderWeightSlider(weight) {
  return renderSlider('Weight', weight, 'kg', 'weight', 40, 140);
}

function renderHeightSlider(height) {
  return renderSlider('Height', height, 'cm', 'height', 140, 210);
}

function bmi(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

function getSliderEvent(domSource, className) {
  return domSource.select('.' + className)
    .events('input')
    .map(ev => ev.target.value);
}

function intent(domSource) {
  return {
    changeWeight$: getSliderEvent(domSource, 'weight'),
    changeHeight$: getSliderEvent(domSource, 'height')
  }
}

function model(actions) {
  const weight$ = actions.changeWeight$.startWith(70);
  const height$ = actions.changeHeight$.startWith(170);
  return xs.combine(weight$, height$)
    .map(([weight, height]) => {
      return {weight, height, bmi: bmi(weight, height)};
    });
} 

function view(state$) {
  return state$.map(({weight, height, bmi}) =>
    div([
      renderWeightSlider(weight),
      renderHeightSlider(height),
      h2('BMI is ' + bmi)
    ])
  );
}

function bmiComp(sources) {
  return {
    DOM: view(model(intent(sources.DOM)))
  }
}

export default bmiComp;
