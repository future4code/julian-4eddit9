import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignupPage from './components/SignupPage';

function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' />
                <Route component={SignupPage} exact path='/signup' />
                <Route exact path='/feed' />
                <Route exact path='/post-details/:postId' />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes