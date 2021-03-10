import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { instanceOf} from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import './pages.css';

class WeightNamePage extends Component {
    // checking the type of data as element of class with warning
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    state = {
        name: "",
        sex: "",
        weight: 0,
        activity: 0,
        isSubmitted: true,
        warning: false,
    }

    componentDidUpdate() {
        // this.checkValidValue();
    
        this.eraseFunction();
    }

    getName = () => {
        let name = document.getElementById("name").value;
        this.setState(() => ({
            name
        }))
    }

    getSexTest = () => {
        const radio1 = document.getElementById("male");
        const male = radio1.value;
        const radio2 = document.getElementById("female");
        const female = radio2.value;

        if(radio1.checked) {
            this.setState(() => ({
                sex: male
            }))
            this.props.get_sex_test(male);
        }
        if(radio2.checked) {
            this.setState(() => ({
                sex: female
            }))
            this.props.get_sex_test(female);
        }
    }
    
    getWeightTest = () => {
        let weight = document.querySelector("#weight").value;

        this.setState(() => ({
            weight
        }))

        this.props.get_weight_test(weight);
    }

    getActivityTest = () => {
        let activity = document.querySelector("#activity").value;

        this.setState(() => ({
            activity
        })) 

        this.props.get_activity_test(activity);
    }

    // checkValidValue = (elem) => {
    //     let value = elem.value;
    //     if(!isFinite(value)){
    //         this.setState(() => ({
    //             warning: true
    //         }));
    //         elem.style = "background-color: red"; 
    //     } 
    // }

    eraseFunction = (element) => {
        if(this.state.warning) {
            let string = element.value,
                lastSymbol = string.charAt(string.length - 1);
            string.slice(lastSymbol, 0);
            element.style =  "background-color: white"; 
        }
    }

    getCookie = (name, sex, weight, activity) => {
        const { cookies } = this.props;

        cookies.set('name', name, { path: '/' });
        cookies.set('sex', sex, { path: '/' });
        cookies.set('weight', weight, { path: '/' });
        cookies.set('activity', activity, { path: '/' });

        const next = document.querySelector(".next");
        next.style = "display: block";
        const submit = document.querySelector(".submit");
        submit.style = "display: none";
    }

    nextPage = () => {
        this.props.history.push("/main");
    }

    goToNextPage = () => {
        if(this.state.isSubmitted){
            this.nextPage();
        } else {
            alert("Fill out your data");
        }
    }

    render() {
        const {name, sex, weight, activity} = this.state;

        return (
            <div className="form form2">
                <div className="wrapper2">
                    <div id="field">
                        <div id="ques">1) What's your name?</div>
                        <input type="text" maxLength="24" id="name" onChange={this.getName}/>
                    </div>
                    <div id="field">
                        <div id="ques">2) What's your sex?</div>
                        <form onChange={this.getSexTest}>
                            <input type="radio" id="male" name="gender" value="male"/>
                            <label htmlFor="male">Male</label> 
                            <input type="radio" id="female" name="gender" value="female"/>
                            <label htmlFor="female">Female</label>
                        </form>
                    </div>
                    <div id="field">
                        <div id="ques">3) Your weight?</div>
                        <input type="text" maxLength="3" id="weight" onChange={this.getWeightTest}/>
                    </div>
                    <div id="field">
                        <div id="ques">4) How long you do exercises per day?</div>
                        <input type="text" maxLength="3" id="activity" onChange={this.getActivityTest}></input>
                    </div>
                </div>
                <div id="btn">
                    <button id="but" className="submit" onClick={()  => this.getCookie(name, sex, weight, activity)}>submit</button>
                    <button id="but" className="next" onClick={this.goToNextPage}>next</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cur_weight: state.weight,
        cur_activity: state.activity,
        cur_sex: state.sex
    }
}

export default withRouter(connect(mapStateToProps, actions)(WeightNamePage));