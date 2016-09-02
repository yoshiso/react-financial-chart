import React, { Component } from 'react';
import { min, max, scaleLinear, scalePoint } from "d3";

import { ColorSchemePropType, OHLCPropType } from './proptypes';
import { CandleStick } from './CandleStick'

export class CandleStickChart extends Component {
  render() {
    const { height, width, barWidth, OHLC, colorScheme } = this.props;

    const xScale = scalePoint()
                     .domain(OHLC['date'])
                     .range([0, width])
                     .padding(0.5)
    const yScale = scaleLinear()
                      .range([height, 0])
                      .domain([
                          min(OHLC['low']),
                          max(OHLC['high'])
                      ])

    const candlesticks = OHLC['date'].map(function(date, i) {
      return (
        <CandleStick
                O={OHLC['open'][i]}
                H={OHLC['high'][i]}
                L={OHLC['low'][i]}
                C={OHLC['close'][i]}
                date={date}
                xScale={xScale}
                yScale={yScale}
                barWidth={8}
                key={date}
                colorScheme={colorScheme} />
      )
    })

    return (
      <g>{candlesticks}</g>
    );
  }
}

CandleStickChart.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  barWidth: React.PropTypes.number.isRequired,
  colorScheme: ColorSchemePropType.isRequired,
  OHLC: OHLCPropType.isRequired
}
