import React, {Component} from "react";

import './slider.css';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.nextSlide = this.nextSlide.bind(this); 
        this.prevSlide = this.prevSlide.bind(this);

        this.state = {
            arr: []
        }
    }

    componentDidMount() {
        this.generateSlides();
        const wrap = document.querySelector(".wrpper").children;
        for (const elem of wrap) {
            this.state.arr.push(elem); // put all slides to array
        } 
    }

    nextSlide() {
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

    prevSlide() {
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

    generateSlides() {
        for(let i = 40; i < 600; i = i + 10) {
            const wrapper = document.querySelector(".wrpper");
            let child = document.createElement("div");
            let text = document.createTextNode(`${i + 10}`);
            child.appendChild(text);
            child.classList.add("slide");
            wrapper.appendChild(child);
            if(i === 50) {
                child.classList.add("first");
            }
            if(i === 90) {
                child.classList.add("active");
            }
            if(i === 600) {
                child.classList.add("last");
            }
        }
    }

    render() {
        return(
            <div className="slider">
                <div className="wrpper"></div>
                <button id="up" onClick={this.nextSlide}>△</button>
                <button id="down" onClick={this.prevSlide}>▽</button>
            </div>
        )
    }
}