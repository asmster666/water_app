import React, {Component} from "react";
import {connect} from 'react-redux';
import {get_cur_amount} from '../../actions';
import './ml_scroll.css';


class Mlscroll extends Component {

    state = {
        arr: []
    }

    componentDidMount() {
        this.generateSlides();
        const wrap = document.querySelector(".wrapper").children;
        let newArray = [];
        for (let elem of wrap) {
            newArray.push(elem);
            this.setState(() => ({
                arr: newArray
            }));
        }
        
    }

    nextSlide = () => {
        const {arr} = this.state;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].classList.contains("active")) {
                arr[i].classList.remove("active");
                arr[i-1].classList.add("active");
            }

            if(arr[i].classList.contains("first") && arr[i].classList.contains("active")) {
                arr[i].classList.remove("active");
                arr[(arr.length -1) - 1].classList.add("active");
            }
        }
    } 

    prevSlide = () => {
        const {arr} = this.state;
        for(let i = arr.length - 1; i > 0; i--) {
            if(arr[i].classList.contains("active")) {
                arr[i].classList.remove("active");
                arr[i+1].classList.add("active");
            }

            if(arr[i].classList.contains("last") && arr[i].classList.contains("active")) {
                arr[i].classList.remove("active");
                arr[0].classList.add("active");
            }
        }
    }
 
    generateSlides = () => {
        const wrapper = document.querySelector(".wrapper");
        for(let i = 40; i < 600; i = i + 10) {
            let child = document.createElement("div");
            let text = document.createTextNode(`${i + 10}`);
            child.appendChild(text);
            child.classList.add("slide");
            wrapper.appendChild(child);
            if(i === 40) {
                child.classList.add("first");
            }
            if(i === 240) {
                child.classList.add("active");
            }
            if(i === 600) {
                child.classList.add("last"); 
            }
        }
    }

    getDaily = () => {
        const wrap = document.querySelector(".wrapper").children;
        for (let elem of wrap) {
            if(elem.classList.contains("active")){
                let data = elem.textContent;

                // update store
                this.props.get_cur_amount(data); 
            }
        }
    }

    render() {

        return (
            <div className="ml_scroll">
                <i id="up" onClick={this.nextSlide} className="fas fa-chevron-circle-up"></i>
                <div className="wrapper" onClick={this.getDaily}></div>
                <i id="down" onClick={this.prevSlide} className="fas fa-chevron-circle-down"></i>
            </div>  

        )
    }
};

const mapStateToProps = (state) => {
    return {
        cur_amount: state.cur_amount
    }
};
 
export default connect(mapStateToProps, {get_cur_amount})(Mlscroll);