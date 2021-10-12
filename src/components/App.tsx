import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import SearchForm from "./SearchForm";
import DataFrame from "./DataFrame";
import {Person} from "../models";

interface IProps {}

interface IState {
    apiResponse: Person | null,
    apiError: string
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleAPILoad = this.handleAPILoad.bind(this);
        this.setApiError = this.setApiError.bind(this);
        this.state = { apiResponse: null, apiError: '' };
    }

    handleAPILoad (data: Person) {
        this.setState({ apiResponse: data });
    }

    setApiError (apiError: string) {
        this.setState({ apiError: apiError });
    }

    render () {
        return (
            <div className="App" style={{ margin: '5px 0' }}>
                <h1 style={{ textAlign: "center" }} className="mt-3 mb-3">Star Wars Search</h1>
                {this.state.apiError.length > 0 &&
                    <Alert variant="danger" onClose={() => this.setState({apiError: ''})} dismissible>
                        {this.state.apiError}
                    </Alert>
                }
                <SearchForm onDataLoad={this.handleAPILoad} onDataError={this.setApiError} />
                { this.state.apiResponse !== null && <DataFrame apiData={this.state.apiResponse} /> }
            </div>
        );
    }
}

export default App;
