import React, { Component, PropTypes } from 'react';
import { getDisplayName, findByComponent, getMouseOffset } from '../utils/react';

const findAndProvisionXAxis = (children, props) => {
  const xAxis = findByComponent(children, 'XAxis');
  if (!xAxis) { return null };
  return React.cloneElement(xAxis, { ...props })
}

const findAndProvisionYAxis = (children, props) => {
  const yAxis = findByComponent(children, 'YAxis');
  if (!yAxis) { return null };
  return React.cloneElement(yAxis, { ...props })
}

const findAndProvisionLegend = (children, props) => {
  // todo: standarize Legend
  const legend = findByComponent(children, 'CandleLegend');
  return React.cloneElement(legend, { ...props })
}

export default (ChartComponent) => {
  return class ChartWrapper extends Component {
    static displayName = getDisplayName(ChartComponent);

    static propTypes = {
      layout: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number
      }),
      axisHeight: React.PropTypes.number,
      axisWidth: React.PropTypes.number,
      data: PropTypes.object,
      margin: PropTypes.shape({
        top: PropTypes.integer,
        left: PropTypes.integer,
        right: PropTypes.integer,
        bottom: PropTypes.integer
      })
    }

    static defaultProps = {
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      axisHeight: 20,
      axisWidth: 60
    }

    state = {
      hovering: {
        isHover: false,
        x: null,
        y: null
      }
    }

    onMouseEnterChart(e) {
      const offset = getMouseOffset(e, this.refs.chartWrapper.getBoundingClientRect());
      this.setState({ hovering: { isHover: true, ...offset }});
    }

    onMouseLeaveChart(e) {
      this.setState({ hovering: { isHover: false, x: null, y: null }})
    }

    onMouseMoveChart(e) {
      const offset = getMouseOffset(e, this.refs.chartWrapper.getBoundingClientRect());
      this.setState({ hovering: { isHover: true, ...offset }});
    }

    chartRect() {
      const { layout, margin } = this.props;
      return {
        width: layout.width - margin.left - margin.right,
        height: layout.height - margin.top - margin.bottom
      }
    }

    render() {
        const { layout, margin, children, axisHeight, axisWidth, ...others } = this.props;
        const { colorScheme } = others;
        const containerRect = this.chartRect()

        const xAxis = findAndProvisionXAxis(children, {
          ...containerRect, data: others.data, axisWidth, axisHeight
        });

        const yAxis = findAndProvisionYAxis(children, {
          ...containerRect, data: others.data, axisWidth, axisHeight
        })

        const chartRect = {
          width: xAxis ? containerRect.width - yAxis.props.axisWidth :  containerRect.width,
          height: yAxis ? containerRect.height - xAxis.props.axisHeight :  containerRect.height
        }
        const { hovering } = this.state;
        const legend = findAndProvisionLegend(children, {
          data: others.data, chartRect, hovering
        })

        console.debug('chartRect', chartRect)

        return (
          <g width={chartRect.width}
             height={chartRect.height}
             transform={ `translate(${margin.left},${margin.top})` }
             onMouseEnter={this.onMouseEnterChart.bind(this)}
             onMouseLeave={this.onMouseLeaveChart.bind(this)}
             onMouseMove={this.onMouseMoveChart.bind(this)}
             >
            <rect ref='chartWrapper'
                  width={chartRect.width}
                  height={chartRect.height}
                  fill={colorScheme.chartBg}
                  stroke={colorScheme.chartFrame}></rect>
            { xAxis }
            { yAxis }
            <ChartComponent
              rect={ chartRect }
              hovering={ this.state.hovering }
              { ...others }
              ></ChartComponent>
            { legend }
          </g>
        );
    }
  };
}
