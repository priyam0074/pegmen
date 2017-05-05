import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers/index';
import { Router, browserHistory, hashHistory, IndexRoute, Route } from 'react-router';
import routes from './routes';

const store = compose(applyMiddleware(thunk),autoRehydrate())(createStore)(reducer)

export default class AppProvider extends React.Component {

    constructor() {
        super()
        this.state = { rehydrated: false }
    }

    componentWillMount() {
        persistStore(store, {}, () => {
            this.setState({ rehydrated: true })
        })
    }

    render() {
        if (!this.state.rehydrated) {
            return <div>Loading...</div>
        }
        return (
            <Provider store={store}>
                <Router routes={routes} history={hashHistory} />

            </Provider>
        )
    }
}