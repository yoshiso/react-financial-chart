import React, { Component } from 'react';

import OHLC from './USDJPY'
import { CandleStickChart, XAxis, YAxis, CandleLegend } from '../src'
import { defaultColorScheme } from '../src/proptypes';

const newOne = {};
['open', 'high', 'low', 'close', 'date'].forEach(function(n) {
  newOne[n] = OHLC[n].slice(0, 60)
})
console.log(newOne)

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      height: 600,
      width: 800,
      ohlc: newOne,
      n: 0
    }
  }

  componentDidMount() {
    const self = this
    window.addEventListener('resize', function() {
      self.setState({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20
      })
    })
  }

  onClickLeft(e) {
    const next = {};
    ['open', 'high', 'low', 'close', 'date'].forEach(function(n) {
      next[n] = OHLC[n].slice(self.state.n - 1, self.state.n - 1 + 60)
    })
    this.setState({
      ohlc: next,
      n: this.state.n - 1
    })
  }

  onClickRight(e) {
    self = this;
    const next = {};
    ['open', 'high', 'low', 'close', 'date'].forEach(function(n) {
      next[n] = OHLC[n].slice(self.state.n + 1, self.state.n + 1 + 60)
    })
    this.setState({
      ohlc: next,
      n: this.state.n + 1
    })
  }

  render() {
    const layout = this.state;
    const barWidth = 8;
    const colorScheme = defaultColorScheme;

    return (
      <div>
        <svg width={`${layout.width}px`}
             height={`${layout.height}px`}>
          <rect width={layout.width}
                height={layout.height}
                fill={colorScheme.bg}></rect>
          <CandleStickChart
            layout={layout}
            barWidth={barWidth}
            colorScheme={colorScheme}
            data={this.state.ohlc}>
            <XAxis dataKey='date' />
            <YAxis dataKey={['open', 'high', 'low', 'close']} />
            <CandleLegend />
          </CandleStickChart>
        </svg>
        <button onClick={this.onClickLeft.bind(this)}>Left</button>
        <button onClick={this.onClickRight.bind(this)}>Right</button>
      </div>
    );
  }
}
