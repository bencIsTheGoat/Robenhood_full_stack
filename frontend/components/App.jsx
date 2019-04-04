import React from 'react';
import HomeContainer from './session/home_container';
import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';
import HomePageContainer from './home_page/home_page_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import StockShowContainer from './stock_show/stock_container';

const App = () => (
    <div>
        <header>
            <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
        </header>
        
        <Switch>
            <Route exact path='/' component={HomeContainer}/>
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <ProtectedRoute exact path="/stocks/:ticker" component={StockShowContainer} />
            <ProtectedRoute exact path='/home' component={HomePageContainer} />
        </Switch>
    </div>
);

export default App;