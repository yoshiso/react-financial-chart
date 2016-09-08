import React, { Component, PropTypes } from 'react';
import { scaleLinear, min, max } from 'd3';

import { isString } from '../utils/types';

const minMax = (data, keys) => {
  const mins = []
  const maxes = []
    keys.forEach((k) => {
    if (data[k]) {
      mins.push(min(data[k]))
      maxes.push(max(data[k]))
    }
  })
  return [min(mins), max(maxes)]
}

const normalizeDataKey = (dataKey) => {
  if (isString(dataKey)) {
    return [dataKey];
  } else {
    return dataKey;
  }
}

export class YAxis extends Component {

  static displayName = 'YAxis';

  static propTypes = {
    data: PropTypes.object,
    dataKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
    formatter: PropTypes.func
  };

  static defaultProps = {
    axisTextLeft: 4,
    fontSize: 12,
    tickCount: 8,
    formatter: (t) => t.toFixed(2)
  }

  render() {
    const { width, height, data, dataKey, tickCount, axisWidth, axisHeight } = this.props;
    const { formatter } = this.props;
    const { fontSize, axisTextLeft } = this.props;
    const chartHeight = height - axisHeight;

    const scale = scaleLinear()
                    .range([chartHeight, 0])
                    .domain(minMax(data, normalizeDataKey(dataKey)))
    const tickValues = scale.ticks(tickCount);

    const textOffsetX  = width - axisWidth;
    const yAxisOffsetX = width - axisWidth;

    return (
      <g>
        {
          tickValues.map((t) => {
            return (
              <g key={`ytick-${t}`}>
                <text x={textOffsetX + axisTextLeft}
                      y={scale(t) + 4}
                      textAnchor="start"
                      fontSize={fontSize}>
                      { `${ formatter(t) }` }
                </text>
                <line x1={0}
                      x2={yAxisOffsetX}
                      y1={scale(t)}
                      y2={scale(t)}
                      style={ {stroke: '#c2c2c2', opacity: 0.3} }></line>
              </g>
            )
          })
        }
      </g>
    );
  }
}
