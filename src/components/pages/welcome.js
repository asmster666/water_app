import React, {Component} from "react";
import { withRouter } from "react-router-dom";

import './pages.css';

class WelcomePage extends Component {
    
    nextPage = () => {
        this.props.history.push("/second");
    }

    render() {
        return (
            <div className="form form1">
                <div className="wrapper">
                    <div className="title">Water App</div>
                    <div id="glass" className="glass"></div>
                </div>
                <div className="wrap">
                    <button id="but" className="start" onClick={this.nextPage}>start</button>
                    <div id="design">designed by Infinity Web</div>
                </div>
            </div>
        )
    }
}

export default withRouter(WelcomePage);