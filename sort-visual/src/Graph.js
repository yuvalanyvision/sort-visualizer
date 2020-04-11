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
        fetch('http://127.0.0.1:5000/algorithms', {mode: 'no-cors'})
            .then(result => {
                console.log(result);
            });
    }

    Generate(start, end, amount) {
        postData('http://127.0.0.1:5000/generate', {start: start, end: end, amount: amount})
            .then((data) => {
                console.log(data); // JSON data parsed by `response.json()` call
            });
    }

    StartSort() {
        postData('http://127.0.0.1:5000/sort', {})
            .then((data) => {
                console.log(data); // JSON data parsed by `response.json()` call
            });
    }

    render() {
        const bars = this.state.data.slice().map((value,index) => {
            return (
                <div className="graph-items" key={index}>{value}</div>
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
        mode: 'no-cors', // no-cors, *cors, same-origin
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
    return response; // parses JSON response into native JavaScript objects
}