import React, {Component} from 'react';
import './type_scroll.css';


export default class Typescroll extends Component {

    state = {
        array: ['water', 'juice', 'milk', 'coffee', 'tea', 'kefir', 'yoghurt', 'alcohol']
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

    render() {
        return (
            <div className="type_scroll">
                <div className="slider"></div>
            </div>
        )
    }
}

