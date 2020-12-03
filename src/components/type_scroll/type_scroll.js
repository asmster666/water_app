import React, {Component, createElement} from 'react';
import './type_scroll.css';
import '../../type_db.json';

// const data = "../../type_db.json";

export default class Typescroll extends Component {
    constructor(props) {
        super(props);

        this.showListOfDrinks = this.showListOfDrinks.bind(this);
    }

    state = {
        arr: ['water', 'juice', 'milk', 'coffee', 'tea', 'kefir', 'yoghurt', 'alcohol']
    }

    showListOfDrinks() {
        const slider = document.querySelector(".slider");
        for(let i = 0; i < this.state.arr.length; i++) {
            let field = document.createElement("div");
            let text = document.createTextNode(`${this.state.arr[i]}`);
            field.appendChild(text);
            slider.appendChild(field);
            if(this.state.arr[i] === "water") {
                field.styled = `display: block`;
            }
        }
    }

    render() {
        return (
            <div className="type_scroll">
                <div className="slider" onClick={this.showListOfDrinks}></div>
            </div>
        )
    }
}