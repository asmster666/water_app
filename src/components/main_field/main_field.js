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
        gotDaily: false
    }

    componentDidMount() {
        this.getResult();
    }
    
    getAmount = () => {
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

    getDailyAmount = ({cur_amount}) => {
        this.setState(() => ({
            daily_amount: cur_amount,
            gotDaily: true  
        }))
    }

    getResult = () => {
        this.getDailyAmount(this.props);
        if(this.state.daily_amount !== 0) {
            return this.props.daily_amount;
        } else {
            console.log("not get it");
        }
    }

    changeImage = () => {
         
    }

    render() {
        const {daily_amount} = this.state;
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