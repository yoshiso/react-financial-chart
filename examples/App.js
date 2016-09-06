import React, { Component } from 'react';

import OHLC from './USDJPY'
import { CandleStickChart } from '../src'

console.log(OHLC);

['open', 'high', 'low', 'close', 'date'].forEach(function(n) {
  OHLC[n] = OHLC[n].slice(0, 60)
})


export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      height: 600,
      width: 800
    }
  }

  componentDidMount() {
    const self = this
    window.addEventListener('resize', function() {
      self.setState({width: window.innerWidth})
    })
  }

  render() {
    const height = this.state.height;
    const width = this.state.width;
    const barWidth = 8;
    const colorScheme = {
      fillUp: '#1ABC9C',
      fillDown: '#EC737D',
      wick: '#898989'
    };

    return (
      <div>
        <svg width={`${width}px`} height={`${height}px`}>
          <CandleStickChart
            height={height}
            width={width}
            barWidth={barWidth}
            colorScheme={colorScheme}
            data={OHLC}
          />
        </svg>
      </div>
    );
  }
}
