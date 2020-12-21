import React, {Component} from "react";
import {connect} from 'react-redux';
import {cur_amount} from '../../actions';
import './ml_scroll.css';


class Mlscroll extends Component {

    constructor(props) {
        super(props);

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    state = {
        arr: [],
        cur_amount: 0 
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
        for(let i = 0; i < this.state.arr.length; i++) {
            if(this.state.arr[i].classList.contains("active")) {
                this.state.arr[i].classList.remove("active");
                this.state.arr[i-1].classList.add("active");
            }

            if(this.state.arr[i].classList.contains("first") && this.state.arr[i].classList.contains("active")) {
                break;
            }
        }
    } 

    prevSlide = () => {
        for(let i = this.state.arr.length - 1; i > 0; i--) {
            if(this.state.arr[i].classList.contains("active")) {
                this.state.arr[i].classList.remove("active");
                this.state.arr[i+1].classList.add("active");
            }

            if(this.state.arr[i].classList.contains("last") && this.state.arr[i].classList.contains("active")) {
                break;
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
        const wrap= document.querySelector(".wrapper").children;
        for (let elem of wrap) {
            if(elem.classList.contains("active")){
                this.setState(() => ({
                    cur_amount: elem.textContent
                }));
            }
        }
    }

    render() {
        return (
            <div className="ml_scroll">
                <button id="up" className="but" onClick={this.nextSlide}>△</button>
                <div className="wrapper" onClick={this.getDaily}></div>
                <button id="down" className="but" onClick={this.prevSlide}>▽</button>
            </div>

        )
    }
};

const mapStateToProps = (state) => {
    return {
        cur_amount: state.cur_amount
    }
};

const mapDispatchToProps = {
    cur_amount
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Mlscroll);