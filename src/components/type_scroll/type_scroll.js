import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get_type} from '../../actions';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['water', 'milk', 'yoghurt', 'coffee', 'alcohol', 'tea', 'juice'],
        arr: []
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
                child.classList.add("first");
            }
            // get the middle elem the active class
            if(i === 3) {
                child.classList.add("active_type");
            }

            if(i === (this.state.array.length - 1)) {
                child.classList.add("last");
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

    // upSlide = () => {
    //     const {arr} = this.state;
    //     for(let j = 3; j > 0; j--) {
    //         if(arr[j].classList.contains("active_type")) {
    //             arr[j].classList.remove("active_type");
    //             arr[j-1].classList.add("active_type");
    //         } 

    //         if(arr[j].classList.contains("first") && arr[j].classList.contains("active_type")) {
    //             arr[j].classList.remove("active_type");
    //             arr[(arr.length-1) - 1].classList.add("active_type");
    //         }
    //     }
    // }

    downSlide = () => {
        const {arr} = this.state;
        for(let i = arr.length - 1; i > 0; i--) {
            if(arr[i].classList.contains("active_type")) {
                arr[i].classList.remove("active_type");
                arr[i+1].classList.add("active_type");
            } 

            if(arr[i].classList.contains("last") && arr[i].classList.contains("active_type")) {
                arr[i].classList.remove("active_type");
                arr[0].classList.add("active_type");
            }
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
                <i id="upp" onClick={this.downSlide} className="fas fa-chevron-circle-up"></i>
                <div className="slider" onClick={this.getCurType} ></div> 
                <i id="downn" onClick={this.downSlide} className="fas fa-chevron-circle-down"></i>
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
