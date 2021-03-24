import React,{Component} from "react";
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

    componentDidMount() {
        this.getCookieData(this.getAmount());
    }

    componentDidUpdate() {
        this.updateSum(this.getResult(this.props.cur_amount, this.props.type)); 
    }
    
    getAmount = () => {
        const { cookies } = this.props;
        let cur_sex = cookies.get('sex');
        let cur_weight = cookies.get('weight');
        let cur_activity = cookies.get('activity');
        let result, data;

        if(cur_sex === "male") {
            result = cur_weight * 35; 
            if(cur_activity > 0) {
                result += cur_activity * (34/3);
            }
            data = Math.floor(result); 
        }

        if(cur_sex === "female") {
            result = cur_weight * 31;
            if(cur_activity > 0) {
                result += cur_activity * (34/3); 
            }
            data = Math.floor(result);
        }

        return data
    }

    getCookieData = (item) => {
        this.props.get_cookie_data(item);
    }

    getResult = (amount, type) => {
        let result;
        if(type) {
            switch (type) {
                case "water":
                    result = amount;
                    break;
                case "milk":
                    result = (0.6 * amount).toFixed(2);
                    break;
                case "yoghurt":
                    result = (0.7 * amount).toFixed(2);
                    break;
                case "coffee":
                    result = (0.33 * amount).toFixed(2);
                    break;
                case "alcohol":
                    result = (0.13 * amount).toFixed(2);
                    break;
                case "tea":
                    result = (0.4 * amount).toFixed(2);
                    break;
                case "juice":
                    result = (0.8 * amount).toFixed(2);
                    break;
                default: 
                    result = amount;
                    break;
            }
        }

        let data = parseInt(result);
        //this.updateSum(data);
    }

    updateSum = (data) => {
        this.props.get_cur_daily_amount(data)
    }

    showSum = (sum) => {
        if(isNaN(sum)) {
            return 0;
        } else {
            return parseInt(sum);
        }
    }

    progressBarFunction = (amount, cookie_data) => {
        let css_var = document.querySelector(':root');

        let parsing = parseInt(amount);

        if(cookie_data > 0) {
            let result = ((((parsing / cookie_data) * 100) * 25) / 100).toFixed(1);
            css_var.style.setProperty('--length_of_bar', `${result}rem`);
                
            this.procentProgressBar(result);
        }
    }

    procentProgressBar = (procent) => {
        if(procent > 0) {
            const text = document.querySelector("#bar_text");
            text.innerHTML = `${procent}%`;
        } 
    } 

    render() {
        const {cur_daily_amount, cookie_data} = this.props;

        return (
            <div className="main">
                <div id="glass" className="glass"></div>
                <div id="measure">
                <div id="counter">
                    {this.showSum(cur_daily_amount)}/{this.getAmount()} ml
                </div>
                    <div className="bar">
                        <div id="main_bar"></div>
                        <div id="progress_bar" onChange={this.progressBarFunction(cur_daily_amount, cookie_data)}>
                            <p id="bar_text">0%</p>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cur_weight: state.weight,
        cur_activity: state.activity,
        cur_sex: state.sex,
        cur_amount: state.cur_amount,
        type: state.type,
        cur_daily_amount: state.cur_daily_amount,
        cookie_data: state.cookie_data
    }
}

export default withCookies(connect(mapStateToProps, actions)(Main));