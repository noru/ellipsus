import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import Ellipsus, { Flyby } from '../src/components'

export default class Demo extends Component {

  state = {
    repeat: 5,
    duration: 2000,
    interval: 1000,
    text: 'a really long long long text.........!'
  }


  onChange = (evt) => {
    let name = evt.target.name
    let value = name === 'text' ? evt.target.value : +evt.target.value
    this.setState({ [name]: value })
    console.log(name + ' ' + value)
  }

  render() {
    let { repeat, duration, interval, text } = this.state
    return (
      <div className="app">
        <label>Repeat</label>
        <DebounceInput
          name="repeat"
          value={repeat}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <label>Duration</label>
        <DebounceInput
          name="duration"
          value={duration}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <label>Interval</label>
        <DebounceInput
          name="interval"
          value={interval}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <label>Text</label>
        <DebounceInput
          name="text"
          value={text}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <div className="stage">
          <div style={{ marginTop: '2em' }}>Ellipsus</div>
          <div className="showcase">
            <Ellipsus repeat={repeat} duration={duration} interval={interval}>{text}</Ellipsus>
          </div>
          <div>Flyby</div>
          <div className="showcase">
            <Flyby repeat={repeat} duration={duration} interval={interval}>{text}</Flyby>
          </div>
        </div>

      </div>
    )
  }
}
