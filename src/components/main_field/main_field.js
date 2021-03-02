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

            return Math.floor(result);
        }
        if(sex === "female") {
            let result = weight * 31;
            if(activity > 0) {
                result += activity * (34/3); 
            }

            return Math.floor(result); 
        }
    }

    getResult = (amount, type) => {
        if(type) {
            let result;
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

            this.updateSum(result);
        }
    }

    updateSum = (data) => {
        this.props.get_cur_daily_amount(data)
    }

    showSum = (sum) => {
        return parseInt(sum);
    }

    progressBarFunction = (amount) => {
        let css_var = document.querySelector(':root');

        let result = parseInt(amount);
        css_var.style.setProperty('--length_of_bar', `${result}rem`);

        let procent = Math.floor((result / 12) * 100);
        
        this.procentProgressBar(procent);
    }

    procentProgressBar = (procent) => {
        if(procent > 0) {
            console.log(procent);
            const text = document.querySelector("#bar_text");
            text.innerHTML = `${procent}%`;
        } 
    }

    render() {
        const {cur_amount, cur_type, cur_daily_amount} = this.props;

        return (
            <div className="main">
                <div id="glass" className="glass"></div>
                <div id="measure">
                <div id="counter">{this.showSum(cur_daily_amount)}/{this.getAmount()} ml</div>
                    <div className="bar">
                        <div id="main_bar"></div>
                        <div id="progress_bar" onChange={this.progressBarFunction(cur_daily_amount)}>
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
        cur_amount: state.cur_amount,
        cur_type: state.type,
        cur_daily_amount: state.cur_daily_amount
    }
}

export default connect(mapStateToProps, actions)(withCookies(Main));