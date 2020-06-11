import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

import PostDetailsPage from './components/PostDetailsPage';

function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route component={LoginPage} exact path='/' />
                <Route component={SignupPage} exact path='/signup' />
                <Route exact path='/feed' />
                <Route exact component={PostDetailsPage} path='/post-details' />  {/* /:postId */}
            </Switch>
        </BrowserRouter>
    )
}
export default Routes