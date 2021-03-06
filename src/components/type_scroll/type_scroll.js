import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get_type} from '../../actions';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['juice', 'water', 'milk', 'yoghurt', 'coffee', 'alcohol', 'tea', 'juice', 'water'],
        arr: [],
        counter: 1 
    }

    componentDidMount() {
        this.buildSlider();
        this.fillUpSlideArray();
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
            // get the middle elem the active class
            // if(i === 3) {
            //     child.classList.add("active_type");
            // }

            if(i === (this.state.array.length - 1)) { 
                child.classList.add("firstClone");
            }
        }
    }

    fillUpSlideArray = () => {
        const slider = document.querySelector(".slider").children;
        let slidesArray = [];
        for(let elem of slider) {
            slidesArray.push(elem);
        }

        this.setState(() => ({
            arr: slidesArray 
        }))
    }

    nextSlide = () => {
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        console.log(slides.length);
        const size = slides[0].clientHeight;

        if(counter <= 0) return;
        slider.style.transition = "transform 0.4s ease-in-out";

        this.setState((state) => ({
            counter: state.counter - 1
        }))

        slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
    }

    downSlide = () => {
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        const size = slides[0].clientHeight;

        if(counter >= slides.length -1) return;
        slider.style.transition = "transform 0.4s ease-in-out";

        this.setState((state) => ({
            counter: state.counter + 1
        }))

        slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
    }

    workWithClones = () => {
        const {counter} = this.state;
        const slider = document.querySelector(".slider");
        const slides = document.querySelectorAll(".slider .slides");
        const size = slides[0].clientHeight;

        if(slides[counter].id === "lastClone") {
            slider.style.transition = "none";
            this.setState(() => ({
                counter: slides.length - 2
            }))
            slider.style.transform = 'translateY(' + (-size * counter) + 'px)';
        }
        if(slides[counter].id === "firstClone") {
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
                <i class="upp_type" onClick={this.nextSlide} className="fas fa-chevron-circle-up">⬆️</i>
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

export default connect(mapStateToProps, {get_type})(Typescroll);
