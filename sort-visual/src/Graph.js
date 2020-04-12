import React from 'react';
import request from 'request';
import Form from './Form.js';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './Form.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [...Array(50).keys()],
            algorithms: ['Default', 'BUBBLE', 'MERGE'],
        };

    }

    componentDidMount() {
        const self = this;

        fetch('/algorithms')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                self.setState({algorithms: data.data});
            });
    }

    Generate(start, end, amount) {
        const self = this;

        postData('/generate', {data: {start: start, end: end, count: amount}})
            .then((response) => {
            return response.json();
            })
            .then((data) => {
                console.log(data);
                self.setState({algorithms: data.data});
            });
    }

    StartSort() {
    }

    render() {
        const bars = this.state.data.slice().map((value,index) => {
            return (
                <div className="middle-graph">
                    <div className="graph-items" key={index} style={{height:index*8}} title={index}></div>
                    <label>{value}</label>
                </div>
            );
        });

        return (
            <div>
                <Form algorithms={this.state.algorithms} onSort={this.StartSort} onGenerate={this.Generate}/>
                <div className="graph">{bars}</div>
            </div>
        );
    }
}

export default Graph;

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}