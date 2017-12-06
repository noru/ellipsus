import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const Styles = {

  wrapper: {
    display: 'inline-block',
    overflowX: 'hidden',
    textOverflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: 'left',
  },

  content: sec => ({
    transition: `margin-left ${sec}s linear`,
    WebkitTransition: `margin-left ${sec}s linear`,
    msTransition: `margin-left ${sec}s linear`,
    MozTransition: `margin-left ${sec}s linear`,
  })

}

export class Flyby extends PureComponent {

  _timeoutId = null

  state = {
    marginLeft: 0,
    duration: 0,
  }

  startAnimation({ interval, repeat, duration, flyThrough }) {

    let { marginLeft } = this.state

    if (repeat === 0) {
      repeat = Infinity
    }

    let count = 0
    let trips = repeat * 2

    let _fly = () => {
      let _duration = duration
      let timeout = interval + duration
      if (marginLeft > 0) {
        marginLeft = -this.content.offsetWidth
      } else {
        _duration = 0
        marginLeft = this.wrapper.offsetWidth
        timeout = interval
      }
      this.setState({ marginLeft, duration: _duration })

      if (++count < trips) {
        this._timeoutId = setTimeout(_fly, timeout);
      }
    }
    _fly()
  }

  stopAnimation() {
    clearTimeout(this._timeoutId)
    this._timeoutId = null
  }

  componentDidMount() {
    this.startAnimation(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.stopAnimation()
    this.startAnimation(newProps)
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  render() {
    let { children, className, flyThrough } = this.props
    let { marginLeft, duration } = this.state

    if (typeof children !== 'string') {
      throw Error('Ellipsus: only string is allowed as children, got: ' + typeof children)
    }

    duration = (duration / 1000).toFixed(2) || 2

    return (
      <span
        className={'ellipsus-wrapper ' +(className || '') }
        style={{ ...Styles.wrapper }}
        ref={r => this.wrapper = r}
      >
        <span
          className="ellipsus-content"
          style={{ ...Styles.content(duration), marginLeft }}
          ref={r => this.content = r}
        >
          {children}
        </span>
      </span>
    )
  }
}

Flyby.defaultProps = {
  interval: 3000,
  duration: 2000,
  repeat: Infinity,
}

Flyby.propTypes = {
  interval: PropTypes.number,
  duration: PropTypes.number,
  repeat: PropTypes.number,
}

export default Flyby