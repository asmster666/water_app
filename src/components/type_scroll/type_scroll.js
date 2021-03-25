import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import './type_scroll.css';


class Typescroll extends Component {

    state = {
        array: ['water', 'milk', 'yoghurt', 'coffee', 'alcohol', 'tea', 'juice'],
        counter: 1 
    }

    componentDidMount() {
        this.buildSlider();
    }

    componentDidUpdate() {

    }

    buildSlider = () => { 
        const slider = document.querySelector(".slider");
        for(let i = 0; i < this.state.array.length; i++) {
            let child = document.createElement("div");
            let text = document.createTextNode(`${this.state.array[i]}`);
            child.append(text);
            child.classList.add("slides");
            child.addEventListener('click', () => this.addActive(child));
            slider.appendChild(child);
        }
    }

    addActive = (item) => {
        item.classList.add("slides_clicked", "active_type");
    }

    checkOneActiveElemExist = (elem) => {
        for(let kid of elem) {
            if(!kid.classList.contains("active_type")) {
                kid.style = "pointer-events:none;"; 
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
            } else {
                this.checkOneActiveElemExist(slider);
            }
        }
    }

    render() {

        return (
            <div className="type_scroll">
                <div className="slides_cover">
                    <div className="slider" onClick={this.getCurType}></div>
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

export default connect(mapStateToProps, actions)(Typescroll);
