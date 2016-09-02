import { PropTypes } from 'react';


export const ColorSchemePropType = PropTypes.shape({
  up: PropTypes.string.isRequired,
  down: PropTypes.string.isRequired,
  wick: PropTypes.string.isRequired
})

export const OHLCPropType = PropTypes.shape({
  open: PropTypes.arrayOf(PropTypes.number),
  high: PropTypes.arrayOf(PropTypes.number),
  low: PropTypes.arrayOf(PropTypes.number),
  close: PropTypes.arrayOf(PropTypes.number),
  date: PropTypes.arrayOf(PropTypes.number)
})
