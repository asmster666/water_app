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
        isSubmitted: true,
        warning: false,
    }

    nextPage = () => {
        this.props.history.push("/main");
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

    getSex = () => {
        const radio1 = document.getElementById("male");
        const male = radio1.value;
        const radio2 = document.getElementById("female");
        const female = radio2.value;

        if(radio1.checked) {
            this.setState(() => ({
                sex: male
            }))
        }
        if(radio2.checked) {
            this.setState(() => ({
                sex: female
            }))
        }
    }

    // multiGetFunction = (event) => {
    //     let element = event.target.value

    //     if(element === "weight") {
    //         this.setState(()=>({
    //             weight
    //         }));
    //     } else {
    //         if(element === "activity") {
    //             this.setState(()=>({
    //                 activity
    //             }));
    //         }
    //     }
    // }

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
                        <form onChange={this.getSex}>
                            <input type="radio" id="male" name="gender" value="male"/>
                            <label htmlFor="male">Male</label> 
                            <input type="radio" id="female" name="gender" value="female"/>
                            <label htmlFor="female">Female</label>
                        </form>
                    </div>
                    <div id="field">
                        <div id="ques">3) Your weight?</div>
                        <input type="text" maxLength="3" id="weight" />
                    </div>
                    <div id="field">
                        <div id="ques">4) How long you do exercises per day?</div>
                        <input type="text" maxLength="3" id="activity" ></input>
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