import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// main app
import Calendar from './containers/index';
import configureStore from './store/configStore';
export class ComprehensiveCalendar {
    constructor({ mountPoint, ...props }) {
        this.mountPoint = mountPoint;
        ReactDOM.render(<Provider store={configureStore()}>
            <Calendar {...props}/>
        </Provider>, mountPoint)
    }
    destory() {
        ReactDOM.unmountComponentAtNode(this.mountPoint)
    }
}