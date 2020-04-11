import React from 'react';
import request from 'request';
import Form from './Form.js';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './Form.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
            algorithms: ['XX', 'YY', 'XX'],
        };

    }

    Generate(start, end, amount) {
        request
            .get('http://mysite.com/doodle.png')
            .form({start: start, end: end, amount: amount})
            .on('error', err => {
                console.error(err);
            })
            .on('response', response => {
                console.log(response.headers['content-type']);
            });
    }

    StartSort() {
        request
            .post('http://service.com/upload')
            .form({key:'value'})
            .on('error', err => {

            })
            .on('response', response => {

            });
    }

    render() {
        const bars = this.state.data.slice().map(value => {
            console.log(value);
            return (
                <div className="graph-items">{value}</div>
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