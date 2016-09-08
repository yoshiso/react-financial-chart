import { PropTypes } from 'react';


export const ColorSchemePropType = PropTypes.shape({
  fillUp: PropTypes.string.isRequired,
  fillDown: PropTypes.string.isRequired,
  wick: PropTypes.string.isRequired
})

export const defaultColorScheme = {
  fillUp: '#1ABC9C',
  fillDown: '#EC737D',
  wick: '#898989',
  chartBg: '#F5F5F6',
  chartFrame: '#898989',
  bg: '#fff',
  legend: {
    bg: '#fff',
    frame: '#898989',
    text: '#333'
  }
}

export const OHLCPropType = PropTypes.shape({
  open: PropTypes.arrayOf(PropTypes.number),
  high: PropTypes.arrayOf(PropTypes.number),
  low: PropTypes.arrayOf(PropTypes.number),
  close: PropTypes.arrayOf(PropTypes.number),
  date: PropTypes.arrayOf(PropTypes.number)
})
