import {div, input, p} from '@cycle/dom'
import xs from 'xstream'

function CheckboxToggle(sources) {
  const input$ = sources.DOM.select('input').events('click')
          .map(ev => ev.target.checked)
          .startWith(false)
          .map(toggled => 
            div([
              input({attrs: {type: 'checkbox'}}, 'Toggle me'),
              p(toggled ? 'ON' : 'Off')
            ])
          )
         
  const sinks = {
    DOM: input$,
  }
  return sinks;
}

export {CheckboxToggle}