'use strict';

var React = require('react');
var d3 = require('d3');
var AxisTicks = require('./AxisTicks');
var AxisLine = require('./AxisLine');
var Label = require('./Label');

module.exports = React.createClass({

  displayName: 'XAxis',

  propTypes: {
    fill:            React.PropTypes.string,
    height:          React.PropTypes.number.isRequired,
    width:           React.PropTypes.number.isRequired,
    stroke:          React.PropTypes.string,
    strokeWidth:     React.PropTypes.string,
    tickStroke:      React.PropTypes.string,
    xAxisClassName:  React.PropTypes.string,
    xAxisLabel:      React.PropTypes.string,
    xAxisTickValues: React.PropTypes.array,
    xAxisOffset:     React.PropTypes.number,
    xScale:          React.PropTypes.func.isRequired,
    xOrient:         React.PropTypes.oneOf(['top', 'bottom'])
  },

  getDefaultProps() {
    return {
      fill:            'none',
      stroke:          'none',
      strokeWidth:     'none',
      tickStroke:      '#000',
      xAxisClassName:  'rd3-x-axis',
      xAxisLabel:      '',
      xAxisLabelOffset: 10,
      xAxisOffset:      0,
      xOrient:         'bottom'
    };
  },

  render() {
    var props = this.props;

    var t = `translate(0 ,${props.xAxisOffset + props.height})`;

    var tickArguments;
    if (typeof props.xAxisTickCount !== 'undefined') {
      tickArguments = [props.xAxisTickCount];
    }

    if (typeof props.xAxisTickInterval !== 'undefined') {
      tickArguments = [d3.time[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval];
    }

    return (
      <g
        className={props.xAxisClassName}
        transform={t}
      >
        <Label
          label={props.xAxisLabel}
          offset={props.xAxisLabelOffset}
          orient={props.xOrient}
          margins={props.margins}
          width={props.width}
        />
        <AxisTicks
          tickValues={props.xAxisTickValues}
          tickFormatting={props.tickFormatting}
          tickArguments={tickArguments}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          innerTickSize={props.tickSize}
          scale={props.xScale}
          orient={props.xOrient}
          height={props.height}
          width={props.width}
        />
        <AxisLine
          scale={props.xScale}
          stroke={props.stroke}
          orient={props.xOrient}
          outerTickSize={props.tickSize}
          {...props}
        />
      </g>
    );
  }

});
