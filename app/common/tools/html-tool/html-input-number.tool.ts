export class HTMLInputNumberElementTool {
  mousewheelchangevalue(
    element: HTMLInputElement,
    callback?: (value: number) => void
  ) {
    element.addEventListener('mousewheel', (e) => {
      let event = e as WheelEvent
      let input = e.target as HTMLInputElement
      let value = parseInt(input.value)
      let min = parseInt(input.min)
      let max = parseInt(input.max)
      let step = parseInt(input.step)
      if (Number.isNaN(step)) {
        step = 1
      }
      if (event.deltaY < 0) {
        if (!Number.isNaN(max) && value >= max) {
          return
        }

        value += step
      } else {
        if (!Number.isNaN(min) && value <= min) {
          return
        }
        value -= step
      }

      input.value = value.toString()
      if (callback) {
        ;(function (fn: Function, value: number) {
          setTimeout(() => {
            fn(value)
          }, 0)
        })(callback, value)
      }
    })
  }
}
