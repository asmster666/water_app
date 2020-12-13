import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

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
        isSubmitted: false
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
        this.setState(() => ({
            weight: weight_var
        }))
        return weight_var;
        // if(e.which > 48 && e.which < 58) {
        //     console.log(weight);
        // } else {
        //     continue;
        // }
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
        
        switch (name || sex || weight || activity === null) {
            case (name === null):
                document.getElementById("name").style = "background-color: red";
                console.log("name undefined");
                break;
            case (sex === null):
                document.getElementById("male").style = "background-color: red";
                document.getElementById("female").style = "background-color: red";
                console.log("sex undefined");
                break;
            case (weight === null):
                document.getElementById("weight").style = "background-color: red";
                console.log("weight undefined");
                break;
            case (activity === null):
                document.getElementById("activity").style = "background-color: red";
                console.log("activity undefined");
                break;
            case (name && sex && weight && activity):
                alert("NAH! YOU WONT GO ANY LONGER!!!");
                break;
            default: 
                this.setState(() => ({
                    isSubmitted: true
                }));
                break;
        };

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
                    <button id="but" className="submit" onClick={()  => this.getCookie(name, sex, weight, activity)} >submit</button>
                    <button id="but" className="next" onClick={this.goToNextPage}>next</button>
                </div>
            </div>
        )
    }
}

export default withRouter(WeightNamePage);