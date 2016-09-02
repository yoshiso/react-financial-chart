import React, { Component } from 'react';
import { ColorSchemePropType } from './proptypes';

export class CandleStick extends Component {
    render() {
        const { barWidth, date, O, H, L, C, xScale, yScale, colorScheme } = this.props;
        const yO = yScale(O);
        const yH = yScale(H);
        const yL = yScale(L);
        const yC = yScale(C);
        const xDate = xScale(date);

        const bar = `M${xDate - barWidth / 2},${yO}h${barWidth}V${yC}h${-barWidth}V${yO}z`;
        const highWick = `M${xDate},${Math.min(yC,yO)}V${yH}`;
        const lowWick = `M${xDate},${Math.max(yC,yO)}V${yL}`;

        const fillColor = yO < yC ? colorScheme.up : colorScheme.down;

        return (
          <path d={bar + highWick + lowWick}
                stroke={colorScheme.wick}
                strokeWidth="1"
                fill={fillColor}></path>
        );
    }
}

CandleStick.propTypes = {
    barWidth: React.PropTypes.number.isRequired,
    O: React.PropTypes.number.isRequired,
    H: React.PropTypes.number.isRequired,
    L: React.PropTypes.number.isRequired,
    C: React.PropTypes.number.isRequired,
    date: React.PropTypes.number.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
    colorScheme: ColorSchemePropType.isRequired
}
