import React, { Component } from 'react';
import './App.css';
import SearchForm from "./SearchForm";
import DataFrame from "./DataFrame";
import {Person} from "../models";

interface IProps {}

interface IState {
    apiResponse: Person | null
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleAPILoad = this.handleAPILoad.bind(this);
        this.state = { apiResponse: null };
    }

    handleAPILoad (data: Person) {
        this.setState({ apiResponse: data });
    }

    callAPI() {
        fetch(process.env.REACT_APP_API_URL + "/testAPI")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ apiResponse: result })
                },
                (error) => {
                    console.log(error);
                })
    };

    componentWillMount() {
        this.callAPI();
    }

    render () {
        return (
            <div className="App">
                <SearchForm onDataLoad={this.handleAPILoad} />
                <DataFrame apiData={this.state.apiResponse} />
            </div>
        );
    }
}

export default App;
