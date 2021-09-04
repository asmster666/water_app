import React, {Component} from "react";
import Main from '../main_field';
import Mlscrol from '../ml_scroll/ml_scrol';
import Typescroll from '../type_scroll/type_scrol';
import Statistics from '../statistic';
import { withRouter } from "react-router-dom";

import './pages.css';
import './mainStyles.css';

class MainPage extends Component {
    render() {
        return(
            <div className="appl">
                <Statistics/>
                <div className="main_wrap">
                    <Mlscrol/>
                    <Typescroll/>
                    <Main />
                </div>
            </div>
        )
    }
}

export default withRouter(MainPage);