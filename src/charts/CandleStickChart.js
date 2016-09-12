import React, { Component } from 'react';
import { min, max, scaleLinear, scaleBand } from 'd3';

import { ColorSchemePropType, OHLCPropType } from '../proptypes';
import { CandleStick } from '../shapes/CandleStick';
import wrapChart from './wrapChart';

@wrapChart
export class CandleStickChart extends Component {

  static displayName = 'CandleStickChart';

  static propTypes = {
    keyO: React.PropTypes.string,
    keyH: React.PropTypes.string,
    keyL: React.PropTypes.string,
    keyC: React.PropTypes.string,
    keyDate: React.PropTypes.string,
    colorScheme: ColorSchemePropType.isRequired,
    data: OHLCPropType.isRequired,
    scales: React.PropTypes.shape({
      x: React.PropTypes.func,
      y: React.PropTypes.func
    })
  }

  static defaultProps = {
    keyO: 'open',
    keyH: 'high',
    keyL: 'low',
    keyC: 'close',
    keyDate: 'date'
  }

  static xScaler = scaleBand()
                    .paddingInner(0.2)
                    .paddingOuter(0.2);
  static yScaler = scaleLinear();

  scales() {
    const { scales: { x, y }, data, keyH, keyL, keyDate } = this.props;
    return {
      x:  x.domain(data.map((v) => v[keyDate])),
      y: y.domain([min(data.map((v) => v[keyL])), max(data.map((v) => v[keyH]))])
    }
  }

  render() {
    console.debug('CandleStickChart#render', this.props);
    const { colorScheme } = this.props;
    const { data, keyO, keyH, keyC, keyL, keyDate } = this.props;
    const { x, y } = this.scales();

    const { children } = this.props;
    return (
      <g>
        {
          data.map(function(item) {
            return (
              <CandleStick
                yO={y(item[keyO])}
                yH={y(item[keyH])}
                yL={y(item[keyL])}
                yC={y(item[keyC])}
                x={x(item[keyDate])}
                barWidth={x.bandwidth()}
                key={item[keyDate]}
                colorScheme={colorScheme} />
            )
          })
        }
      </g>
    );
  }
}
