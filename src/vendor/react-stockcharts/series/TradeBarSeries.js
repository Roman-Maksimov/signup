import React, { PropTypes, Component } from "react";
import { line, curveStepBefore } from "d3-shape";

import GenericChartComponent, { getAxisCanvas } from "react-stockcharts/lib/GenericChartComponent";
import { first, last, hexToRGBA, isDefined, isNotDefined } from "react-stockcharts/lib/utils";

class TradeBarSeries extends Component {
    constructor(props) {
        super(props);
        this.renderSVG = this.renderSVG.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }
    drawOnCanvas(ctx, moreProps) {
        const { xAccessor } = moreProps;

        drawOnCanvas(ctx, this.props, moreProps, xAccessor);
    }
    render() {
        return <GenericChartComponent
            canvasToDraw={getAxisCanvas}
            svgDraw={this.renderSVG}
            canvasDraw={this.drawOnCanvas}
            drawOnPan
        />;
    }
    renderSVG(moreProps) {
        /* ToDo: implement this method
        const { xAccessor } = moreProps;
        const { xScale, chartConfig: { yScale }, plotData } = moreProps;

        const { className, widthRatio, stroke, fill, strokeWidth } = this.props;

        const paths = helper(plotData, widthRatio, xScale, yScale, xAccessor).map((each, i) => {
            const dataSeries = line()
                .x((item) => xScale(item.x))
                .y((item) => yScale(item.close))
                .curve(curveStepBefore);

            dataSeries(each.plot);

            return (<path key={i} d={dataSeries(each.plot)} className={each.type}
                          stroke={stroke[each.type]} fill={fill[each.type]} strokeWidth={strokeWidth} />);
        });
        return (
            <g className={className}>
                {paths}
            </g>
        );
        */
    }
}
TradeBarSeries.propTypes = {
    className: PropTypes.string,
    widthRatio: PropTypes.number.isRequired,
    fill: PropTypes.func,
    strokeWidth: PropTypes.number.isRequired,
};

TradeBarSeries.defaultProps = {
    className: "react-stockcharts-kagi",
    widthRatio: 0.8,
    strokeWidth: 2,
    fill: d => d.close > d.open ? "#6BA583" : "#FF0000",
};

function drawOnCanvas(ctx, props, moreProps, xAccessor) {
    const { widthRatio, fill, strokeWidth } = props;
    const { xScale, chartConfig: { yScale }, plotData } = moreProps;

    const paths = helper(plotData, widthRatio, xScale, yScale, xAccessor);

    paths.forEach(d => {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = fill(d);

        ctx.beginPath();

        const x = xScale(d.x);
        const {high, low, open, close, dashWidth} = d;

        ctx.moveTo(x, yScale(high) - strokeWidth / 2);
        ctx.lineTo(x, yScale(low) + strokeWidth / 2);

        ctx.moveTo(x - dashWidth, yScale(open));
        ctx.lineTo(x, yScale(open));

        ctx.moveTo(x, yScale(close));
        ctx.lineTo(x + dashWidth, yScale(close));

        ctx.stroke();
    });
}

function helper(plotData, widthRatio, xScale, yScale, xAccessor) {
    let bars = [];

    const width = xScale(xAccessor(last(plotData)))
        - xScale(xAccessor(first(plotData)));
    const cw = (width / (plotData.length - 1) * widthRatio);
    const barWidth = Math.round(cw); // Math.floor(cw) % 2 === 0 ? Math.floor(cw) : Math.round(cw);
    const dashWidth = barWidth / 2;

    for (let i = 0; i < plotData.length; i++) {
        const x = xAccessor(plotData[i]);
        const {high, low, open, close} = plotData[i];

        if (isNotDefined(close))
            continue;

        bars.push({
            x,
            high,
            low,
            open,
            close,
            dashWidth,
        });
    }

    return bars;
}

export default TradeBarSeries;