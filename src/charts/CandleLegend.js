import React, { Component, PropTypes } from 'react';
import { min, max, scaleLinear, scaleBand, timeFormat } from 'd3';

import { defaultColorScheme, OHLCPropType } from '../proptypes';

const searchDateIndex = (dates, ratio) => {
  return Math.floor(dates.length * ratio)
}

export class CandleLegend extends Component {

  static displayName = 'CandleLegend';

  static propTypes = {
    chartRect: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    rect: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    colorScheme: PropTypes.object,
    data: OHLCPropType,
    keyO: React.PropTypes.string,
    keyH: React.PropTypes.string,
    keyL: React.PropTypes.string,
    keyC: React.PropTypes.string,
    keyDate: React.PropTypes.string,
  }

  static defaultProps = {
    rect: {
      width: 130,
      height: 96
    },
    offset: {
      x: 10,
      y: 10
    },
    colorScheme: defaultColorScheme.legend,
    keyO: 'open',
    keyH: 'high',
    keyL: 'low',
    keyC: 'close',
    keyDate: 'date',
    formatter: timeFormat('%m-%d %H:%M')
  }

  scales() {
    const { chartRect: { width, height }, data, keyH, keyL, keyDate, scales } = this.props;

    const x = scales.x.copy().domain(data.map((v) => v[keyDate]))
    const y = scales.y.copy()
                    .domain([
                        min(data.map((v) => v[keyL])),
                        max(data.map((v) => v[keyH]))
                    ])
    return { x, y }
  }

  render() {
    const { rect: { width, height }, offset: { x, y }, chartRect, colorScheme, hovering } = this.props;
    const { data, keyDate, keyO, keyH, keyL, keyC, formatter } = this.props;

    if (!hovering.isHover) {
      return null;
    }

    const { x: xScale, y: yScale } = this.scales()
    const size = xScale.domain().length * xScale.step();
    const xPos = hovering.x - xScale.step() * xScale.paddingOuter();

    const i = searchDateIndex(data.map((x) => x[keyDate]),
                              (xPos) / size);

    if (!data[i]) return null;

    const yD = y + 20;
    const yO = yD + 16;
    const yH = yO + 16;
    const yL = yH + 16;
    const yC = yL + 16;

    return (
      <g>
        <rect x={x}
              y={y}
              width={width}
              height={height}
              fill={colorScheme.bg}
              stroke={colorScheme.frame}
              opacity={0.8}
              >
        </rect>
        <text y={yD} x={x + 8} fontSize={12} textAnchor="start" fill={colorScheme.text} >{ `Date: ${formatter(new Date(data[i][keyDate]))}`}</text>
        <text y={yO} x={x + 8} fontSize={12} textAnchor="start" fill={colorScheme.text} >{ `Open: ${data[i][keyO].toFixed(2)}`}</text>
        <text y={yH} x={x + 8} fontSize={12} textAnchor="start" fill={colorScheme.text} >{ `High: ${data[i][keyH].toFixed(2)}`}</text>
        <text y={yL} x={x + 8} fontSize={12} textAnchor="start" fill={colorScheme.text} >{ `Low: ${data[i][keyL].toFixed(2)}`}</text>
        <text y={yC} x={x + 8} fontSize={12} textAnchor="start" fill={colorScheme.text} >{ `Close: ${data[i][keyC].toFixed(2)}`}</text>
      </g>
    );
  }

}
