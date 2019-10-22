import React, { Component } from "react";
import { RadialChart, Hint, DiscreteColorLegend } from "react-vis";
// import "./PieChart.css";
// import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import StoreState from '../../Store/state';

export class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  buildValue = value => {
    const { radius, angle, angle0 } = value;
    const truedAngle = (angle + angle0) / 2;
    return {
      x: radius * Math.cos(truedAngle),
      y: radius * Math.sin(truedAngle)
    };
  }

  onMouseEnter = row => {
    this.setState({ value: row.x && row.y ? row : false });
  };

  onMouseOut = () => {
    this.setState({ value: false });
  };
  renderChart = () => {
    const tipStyle = { display: 'flex', color: 'var(--blanc)', background: 'var(--evening-blue)', alignItems: 'center', padding: '5px' };

    const boxStyle = { height: '10px', width: '10px', background: 'var(--evening-blue)', display: 'flex', alignItems: 'center' };
    const data = [
        {
          angle: this.props.batchStatus.OPEN,
          label: `${this.props.batchStatus.OPEN}`,
          color: "var(--chart-blue)",
          innerRadius: 2,
          radius: 4
        },
        {
          angle: this.props.batchStatus.SUBMITTED,
          label: `${this.props.batchStatus.SUBMITTED}`,
          color: "var(--chart-green)",
          innerRadius: 2,
          radius: 4
        },
        {
          angle: this.props.batchStatus.EXAMINE,
          label: `${this.props.batchStatus.EXAMINE}`,
          color: "var(--chart-yellow)",
          innerRadius: 2,
          radius: 4
        },
        {
          angle: this.props.batchStatus.WAITING,
          label: `${this.props.batchStatus.WAITING}`,
          color: "var(--chart-orange)",
          innerRadius: 2,
          radius: 4
        },
        {
          angle: this.props.batchStatus.OTHER,
          label: `${this.props.batchStatus.OTHER}`,
          color: "var(--chart-blank)",
          innerRadius: 2,
          radius: 4
        },
        { 
          angle: this.props.batchStatus.RETURNEDTODAY,
          label: `${this.props.batchStatus.RETURNEDTODAY}`,
          color: "var(--chart-pink)",
          innerRadius: 2,
          radius: 4
        }
      ];

      const items = [
        {
          title: `OPEN: ${this.props.batchStatus.OPEN}`,
          color: "var(--chart-blue)",
          strokeWidth: 15,
          borderRadius: "5px"
        },
        {
          title: `SUBMITTED: ${this.props.batchStatus.SUBMITTED}`,
          color: "var(--chart-green)",
          strokeWidth: 15
        },
        {
          title: `EXAMINE: ${this.props.batchStatus.EXAMINE}`,
          color: "var(--chart-yellow)",
          strokeWidth: 15
        },
        {
          title: `WAITING: ${this.props.batchStatus.WAITING}`,
          color: "var(--chart-orange)",
          strokeWidth: 15
        },
        {
          title: `OTHER: ${this.props.batchStatus.OTHER}`,
          color: "var(--chart-blank)",
          strokeWidth: 15
        },
        {
          title: `RETURNED TODAY: ${this.props.batchStatus.RETURNEDTODAY}`,
          color: "var(--chart-pink)",
          strokeWidth: 15
        }
      ];
      return(
          <div style={{marginLeft: '5%'}}>
            <span>
                <RadialChart
                    className="radial-chart"
                    animation
                    data={data.map(row => {
                    if(this.state.value && this.state.value.color === row.color) {
                        return {
                        ...row, 
                        style: { stroke: "var(--light-gray-a)", strokeWidth: "2px" }
                        };
                    }
                    return row;
                    })}
                    colorType={'literal'}
                    onValueMouseOver={row => this.onMouseEnter(row)}
                    onSeriesMouseOut={this.onMouseOut}
                    labelStyle={{ fontSize: '1rem' }}
                    width={225}
                    height={225}
                    padAngle={0.02}
                >
                {this.state.value ? (
                    <Hint value={this.buildValue(this.state.value)}>
                    <div style={tipStyle}>
                        <div id="hint" style={{...boxStyle}}>{this.state.value.label}</div>
                    </div>
                    </Hint>
                ) : null}
            </RadialChart>
        </span>
        <span>
            <DiscreteColorLegend orientation="vertical" items={items} className="legend" />
        </span>
    </div>
    )
  }
 

  render() {
      
      return (
        <div>
            <div style={{ marginLeft: '5%'}}>PIE CHART</div>
            {this.props.batchStatus ? 
                this.renderChart()
            : 
                <div>
                    <p>Error in Pulling down pie chart data</p>
                </div>
            }
        </div>
      );
  }
}

const mapStateToProps = (state = StoreState.batches) => {
  return {
    batchStatus: state.batches.batchStatus.data
  };
};

export default connect(mapStateToProps)(PieChart);