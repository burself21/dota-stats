import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Home from './Pages/Home/Home';


class App extends React.Component {

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div id='app-main'>
                    <Switch>
                        <Route exact path="/">
                            <Helmet>
                                <title> Dota Stats </title>
                            </Helmet>
                            <Home />
                        </Route>
                        <Route path="/home">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
