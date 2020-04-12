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
    };

    this.Generate = this.Generate.bind(this);
    this.StartSort = this.StartSort.bind(this);
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
      console.log(socket.connected); // true

      socket.emit("sort", {
        data: {
          arr: this.state.data,
          interval: 0.5,
          algorithm: "Merge Sort",
        },
      });
    });

    socket.on("swap", (res) => {
      console.log(res);
    });

    socket.on("final", (res) => {
      console.log(res);
    });
  }

  render() {
    const bars = this.state.data.slice().map((value, index) => {
      return (
        <div className="middle-graph">
          <div
            className="graph-items"
            key={index}
            style={{ height: value * 4 }}
            title={index}
          ></div>
          <label>{value}</label>
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
