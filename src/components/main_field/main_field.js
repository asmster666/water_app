import React, {Component} from "react";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './main_field.css';

class Main extends Component {
    // checking the type of data as element of class with warning
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    state = {
        cur_amount: this.props.cur_amount,
        cur_type: this.props.cur_type,
        daily_amount: this.props.daily_amount,
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

    // getDailyAmount = () => {
    //     return this.props.daily_amount;
    // }

    render() {
        const {daily_amount} = this.props;
        
        return (
            <div className="main">
                <div id="glass" className="glass"></div>
                <div id="measure">
                <div id="counter">{daily_amount}/{this.getAmount()} ml</div>
                    <div id="line"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        daily_amount: state.daily_amount
    }
}

export default connect(mapStateToProps, actions)(withCookies(Main));