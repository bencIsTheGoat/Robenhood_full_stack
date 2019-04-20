import React from 'react';
import HomeContainer from './session/home_container';
import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';
import HomePageContainer from './home_page/home_page_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import StockHomeContainer from './stock_show/stock_home_container';
import {withRouter} from 'react-router-dom';
import AccountContainer from './account/account_container';
import LoadingContainer from '../components/loading/loading_container';

const App = () => (
    <div>
        <header>
            <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
        </header>
        <LoadingContainer/>
        <Switch>
            <Route exact path='/' component={HomeContainer}/>
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <ProtectedRoute exact path='/home' component={HomePageContainer} />
            <ProtectedRoute exact path="/stocks/:ticker" component={StockHomeContainer} />
            <ProtectedRoute exact path='/account' component={AccountContainer} />
        </Switch>
    </div>
);

export default withRouter(App);