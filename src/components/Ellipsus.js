import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const Styles = {

  wrapper: {
    display: 'inline-block',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },

  content: sec => ({
    transition: `margin-left ${sec}s linear`,
    WebkitTransition: `margin-left ${sec}s linear`,
    msTransition: `margin-left ${sec}s linear`,
    MozTransition: `margin-left ${sec}s linear`,
  })

}

export default class Ellipsus extends PureComponent {

  _intervalId = null

  state = {
    marginLeft: 0,
  }

  startAnimation({ interval, repeat, duration, flyThrough }) {

    let { marginLeft, visibility } = this.state
    let wrapperWidth = this.wrapper.offsetWidth
    let contentWidth = this.content.offsetWidth

    if (repeat === 0) {
      repeat = Infinity
    }
    let count = 0
    let trips = repeat * 2
    let offset = wrapperWidth - contentWidth - 10 // add a little padding

    if (offset < -20) {
      this._intervalId = setInterval(() => {

        marginLeft = marginLeft === 0 ? offset : 0
        this.setState({ marginLeft })

        if (++count >= trips) {
          this.stopAnimation()
        }
      }, interval + duration)
    }
  }

  stopAnimation() {
    clearInterval(this._intervalId)
    this._intervalId = null
    this.setState({ marginLeft: 0 })
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
    let { children, className, duration, flyThrough } = this.props
    let { marginLeft, visibility, textOverflow } = this.state

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

Ellipsus.defaultProps = {
  interval: 3000,
  duration: 2000,
  repeat: Infinity,
}

Ellipsus.propTypes = {
  interval: PropTypes.number,
  duration: PropTypes.number,
  repeat: PropTypes.number,
}