import React from 'react';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.Algorithms = {
            Default: 'Default',
            BUBBLE: 'Bubble sort',
            MERGE: 'Merge Sort'
        };

        this.state = {
            start: 0,
            end: 100,
            amount: 100
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleFormChange(event) {
        const target = event.target;
        const key = target.key;

        this.setState({
            [key]: target.value
        });
    }

    handleGenerate(event) {
        event.preventDefault();
        this.props.onGenerate(this.state.start, this.state.end, this.state.amount);
    }

    handleSort(event) {
        event.preventDefault();
        this.props.onSort();
    }

    render() {
        const algorithms = this.Algorithms;
        const algoOptions = this.props.algorithms.slice().map((option, index) => {
            return(
                <option key={index}>{algorithms[option]}</option>
            );
        });

        const startOptions = [...Array(101).keys()].map((option, index) => {
            return(
                <option key={index}>{option}</option>
            );
        });

        const endOptions = [...Array(101).keys()].map((option, index) => {
            return(
                <option key={index}>{option}</option>
            );
        });

        const amountOptions = [...Array(101).keys()].map((option, index) => {
            return(
                <option key={index}>{option}</option>
            );
        });

        return (
            <div>
                <form className="div" onSubmit={this.handleGenerate}>
                    <div className="form-group row">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Start</label>
                            <select key="start" className="form-control" defaultValue={this.state.start} onChange={this.handleFormChange}>
                                {startOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">End</label>
                            <select key="end" className="form-control" defaultValue={this.state.end} onChange={this.handleFormChange}>
                                {endOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Amount</label>
                            <select key="amount" className="form-control" defaultValue={this.state.amount} onChange={this.handleFormChange}>
                                {amountOptions}
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleGenerate}>Generate</button>
                    </div>
                </form>
                <form className="div" onSubmit={this.handleSort}>
                    <div className="form-group row">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Algorithm</label>
                            <select key="algorithm" className="form-control">
                                {algoOptions}
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSort}>Sort!</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
