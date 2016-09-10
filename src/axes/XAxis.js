import React, { Component, PropTypes } from 'react';
import { scaleBand, ticks, timeFormat } from 'd3';

export class XAxis extends Component {

  static displayName = 'XAxis';

  static propTypes = {
    data: PropTypes.object,
    dataKey: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    formatter: PropTypes.func,
    xAxisHeight: PropTypes.number,
    scale: PropTypes.func
  };

  static defaultProps = {
    tickCount: 8,
    formatter: timeFormat('%m/%d %H:%M')
  }

  render() {
    console.log('XAxis#render', this.props);
    const { width, height, data, dataKey, tickCount, xAxisHeight } = this.props;
    const { formatter } = this.props;
    const scale = this.props.scale.copy().domain(data[dataKey]);
    const chartWidth = scale.range()[1] - scale.range()[0];

    // tickValues generator should be fixed.
    // - other points should has equal pads
    // - needs prefix/suffix pad
    const tickValues = ticks(0, data[dataKey].length-1, tickCount)
                          .map((i) => data[dataKey][i])
    const fontSize = 12;
    const textOffsetY = height - fontSize/2;
    const xAxisOffsetY = height - xAxisHeight;

    return (
      <g>
        {
          tickValues.map((t) => {
            return (
              <g key={`xtick-${t}`}>
                <text x={scale(t)}
                      y={textOffsetY}
                      textAnchor="middle"
                      fontSize={fontSize}>
                      { `${ formatter(new Date(t)) }` }
                </text>
                <line x1={scale(t)}
                      x2={scale(t)}
                      y1={xAxisOffsetY}
                      y2={0}
                      style={ {stroke: '#c2c2c2', opacity: 0.3} }></line>
              </g>
            )
          })
        }
      </g>
    );
  }
}
