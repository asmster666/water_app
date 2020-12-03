import React, {Component} from "react";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import './ml_scroll.css';

class Mlscroll extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);

        this.state = {
            arr: [],
            daily: null
        }
    }

    componentDidMount() {
        this.generateSlides();
        const wrap = document.querySelector(".wrapper").children;
        for (let elem of wrap) {
            this.state.arr.push(elem); // it's wrong but i didnt find any other way
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
        const { cookies } = this.props;
        
        const wrap= document.querySelector(".wrapper").children;
        for (let elem of wrap) {
            if(elem.classList.contains("active")){
                this.setState(() => ({
                    daily: elem.textContent
                }))
            }
        }

        cookies.set('daily', this.state.daily, { path: '/' });
    }

    render() {

        return (
            <div className="ml_scroll">
                <button id="up" onClick={this.nextSlide}>△</button>
                <div className="wrapper" onClick={this.getDaily}></div>
                <button id="down" onClick={this.prevSlide}>▽</button>
            </div>

        )
    }
}
 
export default withCookies(Mlscroll);