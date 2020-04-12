import React from "react";
import Form from "./Form.js";
import io from "socket.io-client";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "./Form.css";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [...Array(50).keys()],
        algorithms: ["DEFAULT"],
        swap: Array(0)
    };

    this.Generate = this.Generate.bind(this);
    this.StartSort = this.StartSort.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    fetch("/algorithms")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ algorithms: data.data });
      });
  }

  updateData(swap) {
      if(swap.length>0) {
          let data = this.state.data.slice();
          let temp = data[swap[0]];
          data[swap[0]] = data[swap[1]];
          data[swap[0]] = temp;

          this.setState({
              data: data
          });
      }
  }

  Generate(start, end, amount) {
    postData("/generate", { data: { start: start, end: end, count: amount } })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data.data });
      });
  }

  StartSort(algorithm) {
    const socket = io.connect("/sort");

    socket.on("connect", () => {
      socket.emit("sort", {
        data: {
          arr: this.state.data,
          interval: 0.1,
          algorithm: "Bubble Sort", //Need to change to - algorithm after server fix
        },
      });
    });

    socket.on("swap", (res) => {
        let swap = res.swap;

        if(swap.length > 0) {
            let data = this.state.data.slice();
            let temp = data[swap[0]];
            data[swap[0]] = data[swap[1]];
            data[swap[1]] = temp;

            this.setState({
                data: data,
                swap: swap
            });
        }
    });

    socket.on("final", (res) => {
      this.setState({
          data: res,
          swap: []
      });
    });
  }

  render() {
    const swap = this.state.swap.slice();
    const bars = this.state.data.slice().map((value, index) => {
      let className = "graph-items";

      if(swap.length > 0) {
          className = swap.includes(index) ? "graph-items-swap" : "graph-items";
      }

      return (
        <div className={className}>
          <div
            className={className}
            key={index}
            style={{ height: value * 4 }}
            title={value}
          ></div>

        </div>
      );
    });

    return (
      <div>
        <Form
          algorithms={this.state.algorithms}
          onSort={this.StartSort}
          onGenerate={this.Generate}
        />
        <div className="graph">{bars}</div>
      </div>
    );
  }
}

export default Graph;

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}
