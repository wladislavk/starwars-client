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
