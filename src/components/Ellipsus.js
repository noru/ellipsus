import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const Styles = {

  wrapper: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },

  content: sec => ({
    transition: `margin-left ${sec}s linear`,
    WebkitTransition: `margin-left ${sec}s linear`,
    msTransition: `margin-left ${sec}s linear`,
    MozTransition: `margin-left ${sec}s linear`,
  })

}

export default class Ellipsus extends PureComponent {

  state = {
    marginLeft: 0
  }

  componentDidMount() {

    let wrapperWidth = this.wrapper.offsetWidth
    let contentWidth = this.content.offsetWidth
    let offset = wrapperWidth - contentWidth - 10 // add a little padding

    let { marginLeft } = this.state
    let { repeat } = this.props
    let count = 0
    let trips = repeat * 2

    if (offset < -20) {
      this.intervalId = setInterval(() => {

        marginLeft = marginLeft === 0 ? offset : 0
        this.setState({ marginLeft })

        if (++count >= trips) {
          clearInterval(this.intervalId)
          this.stopAnimation()
        }
      }, this.props.interval )
    }

  }

  stopAnimation() {
    clearInterval(this.intervalId)
  }
  componentWillUnmount() {
    this.stopAnimation()
  }

  render() {
    let { children, className, duration } = this.props
    let { marginLeft } = this.state

    if (typeof children !== 'string') {
      throw Error('Ellipsus: only string is allowed as "children"')
    }

    duration = (duration / 1000).toFixed(2) || 2

    return (
      <span className={'ellipsus-wrapper ' + className }style={Styles.wrapper} ref={r => this.wrapper = r}>
        <span className="ellipsus-content" style={{...Styles.content(duration), marginLeft }} ref={r => this.content = r}>
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