import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get_type} from '../../actions';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['water', 'juice', 'milk/kefir', 'coffee', 'tea', 'yoghurt', 'alcohol']
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
            // get the middle elem the active class
            if(i === 3) {
                child.classList.add("active_type");
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
                <div className="wrap">
                    <i id="upp" className="bi bi-chevron-up" onClick={this.upSlide}></i>
                    <div className="slider" onClick={this.getCurType} ></div> 
                    <i id="downn" className="bi bi-chevron-down" onClick={this.downSlide}></i>
                </div>
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
