/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, IndexRoute,Route } from 'react-router';
import routes from './routes';
import LoginPage from './containers/LoginPage';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { configureStore, MainApp } from './store/configStore';
import { Provider } from 'react-redux';
import DashboardPage from './containers/DashboardPage';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import AppProvider from './App.provider';

injectTapEventPlugin();

//const store = configureStore();

render(
   <AppProvider/>, document.getElementById('app')
);


//=======
//    <Router history={browserHistory}>
//        <Router path="/" component={MainApp}>
//            <IndexRoute component={LoginPage}>
//            </IndexRoute>
//            <Route path='users' component={DashboardPage}>
//                </Route>
//        </Router>
//    </Router>
//>>>>>>> Stashed changes