import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './main_field.css';

function Main1({cur_amount, type, cur_daily_amount, cookie_data, cur_weight, cur_activity, cur_sex, get_cookie_data, get_cur_daily_amount}) {

    // useEffect(() => {

    // }, [])

    function getAmount(weight, activity, sex, get_cookie_data){
        let result, data;
    
        if(sex === "male") {
            result = weight * 35; 
            if(activity > 0) {
                result += activity * (34/3);
            }
            data = Math.floor(result);
            get_cookie_data(data);
            return data
        }
    
        if(sex === "female") {
            result = weight * 31;
            if(activity > 0) {
                result += activity * (34/3); 
            }
            data = Math.floor(result);
            get_cookie_data(data);
            return data 
        }
    }
    
    function getResult(amount, type) {
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
        updateSum(data, get_cur_daily_amount);
    }

    function updateSum(data, props) {
        props(data)
    }

    function showSum(sum) {
        if(isNaN(sum)) {
            return 0;
        } else {
            return parseInt(sum);
        }
    }

    function progressBarFunction(amount, cookie_data) {
        let css_var = document.querySelector(':root');

        let parsing = parseInt(amount);

        if(cookie_data > 0) {
            let result = ((((parsing / cookie_data) * 100) * 25) / 100).toFixed(1);
            css_var.style.setProperty('--length_of_bar', `${result}rem`);
                
            procentProgressBar(result);
        }
    }

    function procentProgressBar(procent) {
        if(procent > 0) {
            const text = document.querySelector("#bar_text");
            text.innerHTML = `${procent}%`;
        } 
    } 
    

    return (
        <div className="main">
            <div id="glass" className="glass"></div>
            <div id="measure">
            <div id="counter" onChange={getResult(cur_amount, type)}>
                    {showSum(cur_daily_amount)}/{getAmount(cur_weight, cur_activity, cur_sex, get_cookie_data)} ml
            </div>
                <div className="bar">
                    <div id="main_bar"></div>
                    <div id="progress_bar" onChange={progressBarFunction(cur_daily_amount, cookie_data)}>
                        <p id="bar_text">0%</p>
                    </div> 
                </div>
            </div>
        </div>
    )
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

export default connect(mapStateToProps, actions)(Main1);