import {h1} from '@cycle/dom'

export function ElapsedSeconds(sources) {
  const elapsedTime$ = xs.periodic(1000)
      .map(i =>
        h1('' + i + ' seconds elapsed')
      )

  const sinks = {
    DOM: elapsedTime$
  }
  return sinks;
}