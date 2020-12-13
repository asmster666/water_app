import React, {Component} from 'react';
import {connect} from 'react-redux';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['water', 'juice', 'milk/kefir', 'coffee', 'tea', 'yoghurt', 'alcohol'],
        cur_type: this.props.cur_type
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

    nextSlide = (e) => {
        if(e.keyCode === 38) {
            alert("slide up");
        }
    }

    prevSlide = (e) => {
        if(e.keyCode === 40) {
            alert("slide down");
        }
    }

    actions = (e) => {
        document.querySelector(".type_scroll").style = "background-color: red";
        this.prevSlide(e);
        this.nextSlide(e);
    }

    render() {
        return (
            <div className="type_scroll" onLoad={this.actions}>
                <div className="slider"></div> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cur_type: state.cur_type
    }
}

export default connect(mapStateToProps, null)(Typescroll);
