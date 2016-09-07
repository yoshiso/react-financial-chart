import React, { Component, PropTypes } from 'react';
import { getDisplayName } from '../utils/react';

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
      margin: { top: 5, left: 5, right: 5, bottom: 5 }
    }

    chartLayout() {
      const { layout, margin } = this.props;
      return {
        width: layout.width - margin.left - margin.right,
        height: layout.height - margin.top - margin.bottom
      }
    }

    render() {
        const { layout, margin, ...others } = this.props;
        const chartLayout = this.chartLayout()

        return (
          <g width={chartLayout.width}
             height={chartLayout.height}
             transform={ `translate(${margin.top},${margin.left})` }>
            <ChartComponent
              layout={ chartLayout }
              { ...others }
              ></ChartComponent>
          </g>
        );
    }
  };
}
