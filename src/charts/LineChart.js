import React, { Component, PropTypes } from 'react';
import { min, max, scaleLinear, scaleBand, line } from 'd3';

import { ColorSchemePropType, OHLCPropType } from '../proptypes';
import { CandleStick } from '../shapes/CandleStick';
import wrapChart from './wrapChart';

@wrapChart
export class LineChart extends Component {

  static displayName = 'LineChart';

  static propTypes = {
    keyX: PropTypes.string,
    keyY: PropTypes.string,
    data: PropTypes.array,
    scales: React.PropTypes.shape({
      x: React.PropTypes.func,
      y: React.PropTypes.func
    })
  }

  static scales = (props) => {
    const { data, keyX, keyY } = props;
    const yValues = data.map((v) => v[keyY]);
    return {
      x: scaleBand()
        .paddingInner(0.2)
        .paddingOuter(0.2).domain(data.map((v) => v[keyX])),
      y: scaleLinear()
        .domain([min(yValues), max(yValues)])
    }
  }

  render() {
    console.debug('LineChart#render', this.props);
    const { colorScheme } = this.props;
    const { data, keyX, keyY, scales: { x, y } } = this.props;

    const { children } = this.props;

    const l = line().x((v) => x(v[keyX]) + x.bandwidth() / 2 ).y((v) => y(v[keyY]))(data);

    return (
      <g>
        <path x="0" y="0" d={l} stroke='#75B2D8' strokeWidth="2" fillOpacity={0}></path>
      </g>
    );
  }
}
