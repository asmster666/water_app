import React, {Component} from 'react';
import Chart from 'react-google-charts';

import './stat.css';

export default class Statistics extends Component {
    render() {
        return(
            <div className="stat">
                <Chart
                    className="chart"
                    width={'500px'}
                    heignt={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['date', 'water'],
                        ['3.12', 1.2],
                        ['4.12', 1.5],
                        ['5.12', 1.3],
                        ['6.12', 1.9],
                        ['7.12', 1],
                    ]}
                    options={{
                        vAxis: {
                            title: 'water',
                            format: 'numbers',
                        }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}