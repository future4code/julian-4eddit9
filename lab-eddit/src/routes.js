import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import FeedPage from './components/FeedPage';


function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route component={LoginPage} exact path='/' />
                <Route component={SignupPage} exact path='/signup' />
                <Route component={FeedPage} exact path='/feed' />
                <Route exact path='/post-details/:postId' />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes