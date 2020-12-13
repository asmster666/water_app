import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';
import {WelcomePage, WeightNamePage, MainPage} from '../pages';

import './app.css';


class App extends Component {
    render() {
        return(
            <CookiesProvider>
                <Router>
                    <div className="app">
                        <Switch>
                            <Route path="/first" exact component={WelcomePage}></Route>
                            <Route path="/second" render={() => (<WeightNamePage cookies={this.props.cookies}/>)}></Route>
                            <Route path="/main" render={() => (<MainPage cookies={this.props.cookies}/>)}></Route>
                        </Switch>
                    </div>
                </Router>
            </CookiesProvider>
        )
    }
}

export default withCookies(App);