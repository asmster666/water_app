import React, {Component} from "react";
import {connect} from 'react-redux';
import {get_cur_amount} from '../../actions';
import './ml_scroll.css';


class Mlscroll extends Component {

    state = {
        aarr: [],
        arr: [...Array(560).fill(null).map((u, i) => i)],
        active: false
    }

    componentDidMount() {
        // this.generateSlider(this.state.arr);
        // console.log(this.state.arr);
        this.generateSlides();
        const wrap = document.querySelector(".wrapper").children;
        let newArray = [];
        for (let elem of wrap) {
            newArray.push(elem);
            this.setState(() => ({
                aarr: newArray
            }));
        }
        
    }

    nextSlide = () => {
        const {aarr} = this.state;
        for(let i = 0; i < aarr.length; i++) {
            if(aarr[i].classList.contains("active")) {
                aarr[i].classList.remove("active");
                aarr[i-1].classList.add("active");
            }

            if(aarr[i].classList.contains("first") && aarr[i].classList.contains("active")) {
                aarr[i].classList.remove("active");
                aarr[(aarr.length -1) - 1].classList.add("active");
            }
        }
    } 

    prevSlide = () => {
        const {aarr} = this.state;
        for(let i = aarr.length - 1; i > 0; i--) {
            if(aarr[i].classList.contains("active")) {
                aarr[i].classList.remove("active");
                aarr[i+1].classList.add("active");
            }

            if(aarr[i].classList.contains("last") && aarr[i].classList.contains("active")) {
                aarr[i].classList.remove("active");
                aarr[0].classList.add("active");
            }
        }
    }
 
    generateSlider = (arr) => {
        arr.map((item) => {
            return (
                <div key={item} class="slide">{item + 50}</div>
            )
        })
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

        const {array} = this.state;

        return (
            <div className="ml_scroll">
                <div id="up" onClick={this.nextSlide}>
                    <div id="img1"></div>
                </div>
                <div className="wrapper" onClick={this.getDaily}>
                    {/* {
                        array.map((item) => {
                            return (
                                <div key={item}>{item + 50}</div>
                            )
                        })
                    } */}
                </div>
                <div id="down" onClick={this.prevSlide}>
                    <div id="img2"></div>
                </div>
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