import React, { Component } from "react";
import "./App.css";
//import SearchField from 'react-search-field';

const fields = [
    {name: "key", zip: "*%3A*"},
];

class SolrDisplay extends Component {
  constructor() {
    super();
    this.state = {
      solrData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    //const cors = require("cors")
    //app.use(cors())
    const URL = "http://localhost:8983/solr/test-wet/select?q=*%3A*&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    //fetch(URL).then(response => response.json())
    //.then(result => {this.setState({ solrData: result });
    //});
    fetch(URL)
        .then(response => response.json())
        .then(solrData => this.setState({ solrData }));
  }
  render() {
    //const solrData = this.state;
    const solrData = this.state.solrData;
    if (!solrData) return <div>Loading</div>;
    return <div>{JSON.stringify(solrData)}</div>;
    //return <h1>{solrData.goals[0].gs_id}</h1>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
     <div className="App">
    {fields.map((keyword, index) => (
      <button
        key={index}
        onClick={() => {
          this.setState({ activePlace: index});
        }}
      >
          {keyword.name}
      </button>
    ))}
    <SolrDisplay
          key={activePlace}
          zip={fields[activePlace].zip}
    />
  </div>
);
  }
}

export default App;
