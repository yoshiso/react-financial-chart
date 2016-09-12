import React, { Component, PropTypes } from 'react';
import { getDisplayName, findAllByComponent, findByComponent, getMouseOffset } from '../utils/react';

const findAndProvisionXAxis = (children, props) => {
  const xAxis = findByComponent(children, 'XAxis');
  if (!xAxis) { return null };
  return React.cloneElement(xAxis, { ...props, ...xAxis.props })
}

const findAndProvisionYAxis = (children, props) => {
  const yAxis = findByComponent(children, 'YAxis');
  if (!yAxis) { return null };
  return React.cloneElement(yAxis, { ...props, ...yAxis.props })
}

const findAndProvisionLegend = (children, props) => {
  // todo: standarize Legend
  const legend = findByComponent(children, 'CandleLegend');
  if (!legend) { return null };
  return React.cloneElement(legend, { ...props, ...legend.props })
}

const findOverlayChart = (children, props) => {

  const charts = findAllByComponent(children, 'LineChart');
  if (charts.length === 0) return null;
  return React.Children.map(charts, (chart) => {
    return React.cloneElement(chart, {
      ...props,
      ...chart.props,
      margin: { left: 0, right: 0, top: 0, bottom: 0 },
      overlay: true
    });
  })
}

export default (ChartComponent) => {
  return class ChartWrapper extends Component {
    static displayName = getDisplayName(ChartComponent);

    static propTypes = Object.assign({}, ChartComponent.propTypes, {
      layout: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number
      }),
      axisHeight: React.PropTypes.number,
      axisWidth: React.PropTypes.number,
      data: PropTypes.array,
      margin: PropTypes.shape({
        top: PropTypes.integer,
        left: PropTypes.integer,
        right: PropTypes.integer,
        bottom: PropTypes.integer
      })
    })

    static defaultProps = Object.assign({}, ChartComponent.defaultProps, {
      margin: { top: 10, left: 40, right: 10, bottom: 10 },
      xAxisHeight: 20,
      yAxisWidth: 60,
      overlay: false
    })

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

    containerRect() {
      const { layout, margin } = this.props;
      return {
        width: layout.width - margin.left - margin.right,
        height: layout.height - margin.top - margin.bottom
      }
    }

    chartRect() {
      const { width, height } = this.containerRect();
      const { xAxisHeight, yAxisWidth } = this.props;
      const yAxis = findByComponent(this.props.children, 'YAxis');
      const xAxis = findByComponent(this.props.children, 'XAxis');
      return {
        width: yAxis ? width - yAxisWidth : width,
        height: xAxis ? height - xAxisHeight : height
      }
    }

    scales() {
      const { width, height } = this.chartRect();
      const mainscales = ChartComponent.scales(this.props);
      const x = mainscales.x.range([0, width])
      const y = mainscales.y.range([height, 0])
      return { x, y }
    }

    render() {
        const { layout, margin, children, xAxisHeight, yAxisWidth, overlay, ...others } = this.props;
        const { colorScheme } = others;
        const containerRect = this.containerRect();
        const scales = this.scales();
        const chartRect = this.chartRect();
        const { hovering } = this.state;

        const mainChart = (
          <ChartComponent
            hovering={ hovering }
            scales={ scales }
            { ...others }
            />
        )

        const xAxis = findAndProvisionXAxis(children, {
          ...containerRect, data: others.data, xAxisHeight, scale: scales.x
        });

        const yAxis = findAndProvisionYAxis(children, {
          ...containerRect, data: others.data, yAxisWidth, scale: scales.y
        });

        const overlays = findOverlayChart(children, {
          layout: chartRect, ...others, scales
        })

        const legend = findAndProvisionLegend(children, {
          data: others.data, chartRect, hovering, scales
        })

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
                  stroke={colorScheme.chartFrame}
                  opacity={(overlay ? 0 : 1)}></rect>
            { xAxis }
            { yAxis }
            { mainChart }
            { overlays }
            { legend }
          </g>
        );
    }
  };
}
