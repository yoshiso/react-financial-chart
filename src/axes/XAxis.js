import React, { Component, PropTypes } from 'react';
import { scalePoint, ticks, timeFormat } from 'd3';

export class XAxis extends Component {

  static displayName = 'XAxis';

  static propTypes = {
    data: PropTypes.object,
    dataKey: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    axisHeight: 20,
    tickCount: 8,
    formatter: timeFormat('%m/%d %H:%M')
  }

  render() {
    const { width, height, data, dataKey, tickCount, axisHeight } = this.props;
    const { formatter } = this.props;
    // tickValues generator should be fixed.
    // - other points should has equal pads
    // - needs prefix/suffix pad
    const scale = scalePoint()
                    .domain(data[dataKey])
                    .range([0, width])
                    .padding(0.5);
    const tickValues = ticks(0, data[dataKey].length-1, tickCount)
                          .map((i) => data[dataKey][i])
    const fontSize = 12;
    const textOffsetY = height - fontSize/2;
    const xAxisOffsetY = height - axisHeight;

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
