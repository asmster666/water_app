import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { instanceOf} from 'prop-types';

import './pages.css';

class WeightNamePage extends Component {
    // checking the type of data as element of class with warning
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    state = {
        name: "",
        sex: "",
        weight: "",
        activity: "",
        isSubmitted: true
    }

    nextPage = () => {
        this.props.history.push("/main");
    }

    getName = () => {
        let userName = document.getElementById("name").value;
        this.setState(() => ({
            name: userName
        }))
    }

    getSex = () => {
        const radio1 = document.getElementById("male");
        const male = radio1.value;
        const radio2 = document.getElementById("female");
        const female = radio2.value;

        if(radio1.checked === true) {
            this.setState(() => ({
                sex: male
            }))
        }
        if(radio2.checked === true) {
            this.setState(() => ({
                sex: female
            }))
        }
    }

    getWeightValue = () => {
        let weight_var = document.getElementById("weight").value;
        if(isNaN(weight_var % 1)) {
            document.getElementById("weight").style = "background-color: red";
            this.sliceString(weight_var);
        } else {
            this.setState(() => ({
                weight: weight_var
            }));
        }
    }

    sliceString = (str) => {
        let lastSymb = str.charAt(str.length - 1);
        str.slice(lastSymb, 0);
        
        return lastSymb;
    }

    getActivity = () => {
        let activity = document.getElementById("activity").value;
        this.setState(() => ({
            activity: activity
        }))
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

    goToNextPage = () => {
        if(this.state.isSubmitted === true){
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
                        <form onChange={this.getSex}>
                            <input type="radio" id="male" name="gender" value="male"/>
                            <label htmlFor="male">Male</label> 
                            <input type="radio" id="female" name="gender" value="female"/>
                            <label htmlFor="female">Female</label>
                        </form>
                    </div>
                    <div id="field">
                        <div id="ques">3) Your weight?</div>
                        <input type="text" maxLength="3" id="weight" onChange={this.getWeightValue}/>
                    </div>
                    <div id="field">
                        <div id="ques">4) How long you do exercises per day?</div>
                        <input type="text" maxLength="3" id="activity" onChange={this.getActivity}></input>
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

export default withRouter(WeightNamePage);