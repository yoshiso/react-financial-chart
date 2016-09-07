import React, { Component } from 'react';
import { min, max, scaleLinear, scalePoint } from 'd3';

import { ColorSchemePropType, OHLCPropType } from '../proptypes';
import { CandleStick } from '../shapes/CandleStick';
import wrapChart from './wrapChart';

class CandleStickChart extends Component {

  static displayName = 'CandleStickChart';

  static propTypes = {
    layout: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number
    }),
    barWidth: React.PropTypes.number.isRequired,
    keyO: React.PropTypes.string,
    keyH: React.PropTypes.string,
    keyL: React.PropTypes.string,
    keyC: React.PropTypes.string,
    keyDate: React.PropTypes.string,
    colorScheme: ColorSchemePropType.isRequired,
    data: OHLCPropType.isRequired
  }

  static defaultProps = {
    keyO: 'open',
    keyH: 'high',
    keyL: 'low',
    keyC: 'close',
    keyDate: 'date',
  }

  scales() {
    const { layout: { width, height }, data, keyH, keyL, keyDate } = this.props;
    const x = scalePoint()
                .domain(data[keyDate])
                .range([0, width])
                .padding(0.5)
    const y = scaleLinear()
                .range([height, 0])
                .domain([
                    min(data[keyL]),
                    max(data[keyH])
                ])
    return { x, y }
  }

  render() {
    const { layout: { height, width }, barWidth, colorScheme } = this.props;
    const { data, keyO, keyH, keyC, keyL, keyDate } = this.props;
    const { x, y } = this.scales()
    const { children } = this.props;
    return (
      <g>
        <rect width={width} height={height} fill={colorScheme.chartBg}></rect>
        {
          data[keyDate].map(function(date, i) {
            return (
              <CandleStick
                yO={y(data[keyO][i])}
                yH={y(data[keyH][i])}
                yL={y(data[keyL][i])}
                yC={y(data[keyC][i])}
                x={x(date)}
                barWidth={8}
                key={date}
                colorScheme={colorScheme} />
            )
          })
        }
      </g>
    );
  }
}

export default wrapChart(CandleStickChart);
