import React, { Component } from 'react';

import OHLC from './USDJPY'
import { CandleStickChart, XAxis, YAxis, CandleLegend } from '../src'
import { defaultColorScheme } from '../src/proptypes';

var newOne = OHLC['date'].slice(0, 60).map((v, i) => {
    return {
      open: OHLC['open'][i],
      high: OHLC['high'][i],
      low: OHLC['low'][i],
      close: OHLC['close'][i],
      date: OHLC['date'][i],
    };
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
    const next = OHLC['date'].slice(0, 60).map((v, i) => {
        return {
          open: OHLC['open'][i],
          high: OHLC['high'][i],
          low: OHLC['low'][i],
          close: OHLC['close'][i],
          date: OHLC['date'][i],
        }
    })
    this.setState({
      ohlc: next,
      n: this.state.n - 1
    })
  }

  onClickRight(e) {
    self = this;
    const next = OHLC['date'].slice(this.state.n + 1, this.state.n + 60 + 1).map((v, i) => {
        return {
          open: OHLC['open'][i],
          high: OHLC['high'][i],
          low: OHLC['low'][i],
          close: OHLC['close'][i],
          date: OHLC['date'][i],
        }
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
