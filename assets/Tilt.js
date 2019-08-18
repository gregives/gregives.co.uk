export default (function() {
  class Tilt {
    constructor(element) {
      this.element = element

      this.addStyles()
      this.addEventListeners()
    }

    addStyles() {
      this.element.style.willChange = 'transform'
      this.element.style.transition = 'transform 600ms ease-out'
      this.element.style.transform = 'perspective(1000px)'
    }

    addEventListeners() {
      this.onMouseMoveBind = this.onMouseMove.bind(this)
      this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this)
      window.addEventListener('mousemove', this.onMouseMoveBind)
      window.addEventListener('deviceorientation', this.onDeviceOrientationBind)
    }

    onMouseMove(event) {
      const xProportion = (event.clientX / window.innerWidth - 0.5) * 2
      const yProportion = -(event.clientY / window.innerHeight - 0.5) * 2

      window.removeEventListener(
        'deviceorientation',
        this.onDeviceOrientationBind
      )
      this.tiltElements(xProportion, yProportion)
    }

    onDeviceOrientation(event) {
      const xProportion = (event.gamma / 90) * 4
      const yProportion = (event.beta / 180) * 8
      this.tiltElements(xProportion, yProportion)
    }

    tiltElements(xProportion, yProportion) {
      xProportion = Math.min(Math.max(xProportion, -1), 1)
      yProportion = Math.min(Math.max(yProportion, -1), 1)
      requestAnimationFrame(
        function() {
          this.element.style.transform =
            'perspective(1000px) ' +
            `rotateY(${10 * xProportion}deg) ` +
            `rotateX(${10 * yProportion}deg) `
        }.bind(this)
      )
    }

    static init(elements, options) {
      if (elements instanceof Node) {
        elements = [elements]
      } else if (elements instanceof NodeList) {
        elements = Array.from(elements)
      }

      if (!Array.isArray(elements)) {
        return
      }

      elements.forEach(function(element) {
        if (!element.hasOwnProperty('tilt')) {
          element.tilt = new Tilt(element, options)
        }
      })
    }
  }

  if (typeof document !== 'undefined') {
    window.Tilt = Tilt
  }

  return Tilt
})()
