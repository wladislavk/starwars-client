import React, { Component } from 'react';
import './App.css';

interface IProps {}

interface IState {
  apiResponse: string
}

class App extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch(process.env.REACT_APP_API_URL + "/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-intro">{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
