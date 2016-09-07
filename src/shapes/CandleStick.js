import React, { Component, PropTypes } from 'react';
import { ColorSchemePropType } from '../proptypes';

export class CandleStick extends Component {

    static propTypes = {
        barWidth: React.PropTypes.number.isRequired,
        yO: React.PropTypes.number.isRequired,
        yH: React.PropTypes.number.isRequired,
        yL: React.PropTypes.number.isRequired,
        yC: React.PropTypes.number.isRequired,
        x: React.PropTypes.number.isRequired,
        colorScheme: ColorSchemePropType.isRequired
    };

    render() {
        const { barWidth, date, yO, yH, yL, yC, x, colorScheme } = this.props;

        const bar = `M${x - barWidth / 2},${yO}h${barWidth}V${yC}h${-barWidth}V${yO}z`;
        const highWick = `M${x},${Math.min(yC,yO)}V${yH}`;
        const lowWick = `M${x},${Math.max(yC,yO)}V${yL}`;

        const fillColor = yO < yC ? colorScheme.fillUp : colorScheme.fillDown;

        return (
          <path d={bar + highWick + lowWick}
                stroke={colorScheme.wick}
                strokeWidth="1"
                fill={fillColor}></path>
        );
    }
}
