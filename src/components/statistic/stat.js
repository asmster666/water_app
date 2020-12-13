import React, {Component} from 'react';
import Chart from 'react-google-charts';

import './stat.css';

export default class Statistics extends Component {
    
    setDates = (a) => {
        let date = new Date();
        let result;
        for(let i = 0; i < 5; i ++) {
            let month = date.getMonth() + 1,
                day = date.getDate() + i,
                num = day + "." + month;
            if(i === a) {
                result = num;
            }
        }
        return result;
    }

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
                        [`${this.setDates(0)}`, 1.2],
                        [`${this.setDates(1)}`, 1.5],
                        [`${this.setDates(2)}`, 1.3],
                        [`${this.setDates(3)}`, 1.9],
                        [`${this.setDates(4)}`, 1],
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