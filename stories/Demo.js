import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import Ellipsus from '../src/components/Ellipsus'

export default class Demo extends Component {

  state = {
    repeat: 10,
    duration: 2000,
    interval: 3000,
  }


  onChange = (evt) => {
    let name = evt.target.name
    let value = +evt.target.value
    this.setState({ [name]: value })
    console.log(name + value);
  }

  render() {
    let { repeat, duration, interval } = this.state
    return (
      <div className="app">
        <label>Repeat </label>
        <DebounceInput
          name="repeat"
          value={repeat}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <label>Duration </label>
        <DebounceInput
          name="duration"
          value={duration}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <label>Interval </label>
        <DebounceInput
          name="interval"
          value={interval}
          debounceTimeout={800}
          onChange={this.onChange} />
        <br/>

        <div style={{ width: '10em', marginTop: '2em', fontSize: '30px' }}>
          <Ellipsus key={Math.random().toString()} repeat={repeat} duration={duration} interval={interval}>a really long long long text.........</Ellipsus>
        </div>
      </div>
    )
  }
}
