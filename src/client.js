import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Acy from './calendar'

class AcyRestore extends Component {
    render() {
        return <div style={{ margin: 100 }} ref={ref => this.node = ref} />
    }
    componentDidMount() {
        this.ComprehensiveCalendar = new Acy.ComprehensiveCalendar({
            mountPoint: this.node, lang: 'en', width: 1160, acyCalendar: true
        })
    }
    componentWillUnmount() {
        this.ComprehensiveCalendar.destroy()
    }
}


class Container extends Component {
    render() {
        return  <AcyRestore />
    }
}
// process.env.NODE_ENV
console.log('process.env', process.env)
console.log(process.env.NODE_ENV)
console.log(process.env.HELLO)
ReactDOM.render(<Container />, document.getElementById('root'))

