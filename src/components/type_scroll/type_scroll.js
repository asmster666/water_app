import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['juice', 'water', 'milk', 'yoghurt', 'coffee', 'alcohol', 'tea', 'juice', 'water'],
        counter: 1 
    }

    componentDidMount() {
        this.buildSlider();
    }

    buildSlider = () => { 
        const slider = document.querySelector(".slider");
        for(let i = 0; i < this.state.array.length; i++) {
            let child = document.createElement("div");
            let text = document.createTextNode(`${this.state.array[i]}`);
            child.append(text);
            child.classList.add("slides");
            slider.appendChild(child);
            
            if(i === 0) {
                child.classList.add("lastClone");
            }
            // get the first elem the active class
            if(i === 1) {
                child.classList.add("active_type");
            }

            if(i === (this.state.array.length - 1)) { 
                child.classList.add("firstClone");
            }
        }
    }

    nextSlide = () => {
        console.log("up");
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        const size = slides[0].clientHeight;

        if(counter <= 0) return;

        slides[counter].classList.remove("active_type");
        slider.style.transition = "transform 0.4s ease-in-out";

        this.setState((state) => ({
            counter: state.counter--
        }))

        console.log(this.state.counter);
        slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
    }

    downSlide = () => {
        console.log("down");
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        const size = slides[0].clientHeight;

        if(counter >= slides.length -1) return;
        slides[counter].classList.remove("active_type");
        slider.style.transition = "transform 0.4s ease-in-out";

        this.setState((state) => ({
            counter: state.counter++
        }))

        slides[counter].classList.add("active_type");
        slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
    }

    workWithClones = () => {
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        const size = slides[0].clientHeight;

        if(slides[counter].className === "lastClone") {
            slider.style.transition = "none";
            this.setState(() => ({
                counter: slides.length - 2
            }))
            slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
        }
        if(slides[counter].className === "firstClone") {
            slider.style.transition = "none";
            this.setState(() => ({
                counter: slides.length - counter
            }))
            slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
        }
    }

    getCurType = () => {
        const slider = document.querySelector(".slider").children;
        for(let slide of slider) {
            if(slide.classList.contains("active_type")) {
                let data = slide.textContent;

                // update store
                this.props.get_type(data);
            }
        }
    }

    render() {

        return (
            <div className="type_scroll">
                <i id="upp_type" onClick={this.nextSlide} className="fas fa-chevron-circle-up">⬆️</i>
                <div className="slider" onClick={this.getCurType} onTransitionEnd={this.workWithClones}></div> 
                <i id="downn" onClick={this.downSlide} className="fas fa-chevron-circle-down">⬇️</i>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cur_type: state.type
    }
}

export default connect(mapStateToProps, actions)(Typescroll);
