import React from 'react';
import HomeContainer from './session/home_container';
import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';
import { Route, Switch } from 'react-router-dom';

const App = () => (
    <div>
        <header>
            <h1>Robenhood</h1>
        </header>
        <Switch>
            <Route exact path='/' component={HomeContainer}/>
            <Route exact path='/login' component={LoginFormContainer} />
            {/* <Route path='/signup' component={SignupFormContainer} /> */}
        </Switch>
    </div>
);

export default App;