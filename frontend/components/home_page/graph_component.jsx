import React from 'react';
import { LineChart, Line} from 'recharts';

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.oneYearData = this.oneYearData.bind(this);
        this.state = {data: []};
    }

    // test

    componentDidMount() {
        this.props.getStockData('aapl', '1m').then(() => this.oneYearData());
        
    }

    oneYearData () {
        let result = this.props.data.map(day => {
            return {
                name: day.date,
                uv: day.close,
            }
        });
        this.setState({data: result});
        debugger;
    }


    render () {
        return (
                <LineChart width={400} height={400} data={this.state.data}>
                    <Line type='monotone' dataKey='uv' stroke='#21ce99'/>
                </LineChart>
         
        );
    }

}

export default Graph;