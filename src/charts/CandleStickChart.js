import React, { Component } from 'react';
import { min, max, scaleLinear, scalePoint } from 'd3';

import { ColorSchemePropType, OHLCPropType } from '../proptypes';
import { CandleStick } from '../shapes/CandleStick';

export class CandleStickChart extends Component {

  static propTypes = {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
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
    const { width, height, data, keyH, keyL, keyDate } = this.props;
    const xScale = scalePoint()
                     .domain(data[keyDate])
                     .range([0, width])
                     .padding(0.5)
    const yScale = scaleLinear()
                      .range([height, 0])
                      .domain([
                          min(data[keyL]),
                          max(data[keyH])
                      ])
    return { xScale, yScale }
  }

  render() {
    const { height, width, barWidth, colorScheme } = this.props;
    const { data, keyO, keyH, keyC, keyL, keyDate } = this.props;
    const { xScale, yScale } = this.scales()
    const { children } = this.props;
    return (
      <g>
        {
          data[keyDate].map(function(date, i) {
            return (
              <CandleStick
                yO={yScale(data[keyO][i])}
                yH={yScale(data[keyH][i])}
                yL={yScale(data[keyL][i])}
                yC={yScale(data[keyC][i])}
                x={xScale(date)}
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
