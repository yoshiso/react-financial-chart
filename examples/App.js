import React, { Component } from 'react';

import OHLC from './USDJPY'
import { CandleStickChart, XAxis, YAxis } from '../src'

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
      self.setState({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20
      })
    })
  }

  render() {
    const layout = this.state;
    const barWidth = 8;
    const colorScheme = {
      fillUp: '#1ABC9C',
      fillDown: '#EC737D',
      wick: '#898989',
      chartBg: '#F5F5F6',
      chartFrame: '#898989',
      bg: '#fff',
    };

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
            data={OHLC}>
            <XAxis dataKey='date' />
            <YAxis dataKey={['open', 'high', 'low', 'close']} />
          </CandleStickChart>
        </svg>
      </div>
    );
  }
}
