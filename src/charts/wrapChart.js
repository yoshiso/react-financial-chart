import React, { Component, PropTypes } from 'react';
import { getDisplayName, findByComponent } from '../utils/react';

const findAndProvisionXAxis = (children, props) => {
  const xAxis = findByComponent(children, 'XAxis');
  if (!xAxis) { return null };
  return React.cloneElement(xAxis, { ...props })
}



export default (ChartComponent) => {
  return class ChartWrapper extends Component {
    static displayName = getDisplayName(ChartComponent);

    static propTypes = {
      layout: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number
      }),
      data: PropTypes.object,
      margin: PropTypes.shape({
        top: PropTypes.integer,
        left: PropTypes.integer,
        right: PropTypes.integer,
        bottom: PropTypes.integer
      })
    }

    static defaultProps = {
      margin: { top: 10, left: 10, right: 10, bottom: 10 }
    }

    chartRect() {
      const { layout, margin } = this.props;
      return {
        width: layout.width - margin.left - margin.right,
        height: layout.height - margin.top - margin.bottom
      }
    }

    render() {
        const { layout, margin, children, ...others } = this.props;
        const { colorScheme } = others;
        const containerRect = this.chartRect()

        const xAxis = findAndProvisionXAxis(children, {
          ...containerRect, data: others.data,
        });

        const chartRect = {
          width: containerRect.width,
          height: containerRect.height - xAxis.props.axisHeight
        }

        console.debug('chartRect', chartRect)

        return (
          <g width={chartRect.width}
             height={chartRect.height}
             transform={ `translate(${margin.left},${margin.top})` }>
            <rect width={chartRect.width}
                  height={chartRect.height}
                  fill={colorScheme.chartBg}></rect>
            { xAxis }
            <ChartComponent
              layout={ chartRect }
              { ...others }
              ></ChartComponent>
          </g>
        );
    }
  };
}
