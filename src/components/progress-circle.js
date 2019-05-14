import React, {Component} from 'react';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    }
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y
    ].join(" ");

    return d
}

export default class ProgressCircle extends Component {
    render() {
        const x = 20;
        const y = 20;
        const radius = 20;
        const currentValue = this.props.currentValue;

        const arc = describeArc(x, y, radius, 0, currentValue);

        return(
            <svg className="progress-circle">
                <path d={ arc } />
            </svg>
        )
    }
}