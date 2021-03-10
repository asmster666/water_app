import React, {Component} from "react";
import Main from '../main_field';
import Mlscroll from '../ml_scroll';
import Typescroll from '../type_scroll';
import Statistics from '../statistic';
import { withRouter } from "react-router-dom";

import './pages.css';

class MainPage extends Component {
    render() {
        return(
            <div className="appl">
                <Main />
                <Mlscroll/>
                <Typescroll/>
                <Statistics/>
            </div>
        )
    }
}

export default withRouter(MainPage);