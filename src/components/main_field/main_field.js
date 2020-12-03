import React, {Component} from "react";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import './main_field.css';

class Main extends Component {
    // checking the type of data as element of class with warning
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    state = {
        gotDaily: false
    }
    
    getAmount() {
        const { cookies } = this.props;

        let weight = parseInt(cookies.get('weight'));
        let sex = cookies.get('sex');
        let activity = parseInt(cookies.get('activity'));

        if(sex === "male") {
            let result = weight * 35;
            if(activity > 0) {
                result += activity * (34/3);
            }

            return Math.round(result, 2);
        }
        if(sex === "female") {
            let result = weight * 31;
            if(activity > 0) {
                result += activity * (34/3);
            }

            return Math.round(result, 2);
        }
    }

    getDailyAmount = () => {
        const { cookies } = this.props;

        let daily = parseInt(cookies.get('daily'));
        this.setState(() => ({
            gotDaily: true
        }))

        return daily;
    }

    render() {
        return (
            <div className="main">
                <div id="glass" className="glass"></div>
                <div id="measure">
                <div id="counter">.../{this.getAmount()} ml</div>
                    <div id="line"></div>
                </div>
            </div>
        )
    }
}

export default withCookies(Main);