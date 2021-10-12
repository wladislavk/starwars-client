import React, {Component, SyntheticEvent} from 'react';
import {IDS_TO_NAMES} from "../constants";
import {Person} from "../models";

interface IProps {
    onDataLoad(data: Person | null): any,
    onDataError(apiError: string): any
}

interface IState {
    searchValue: string,
    isDisabled: boolean
}

export default class SearchForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.state = { searchValue: "", isDisabled: false }
    }

    doSearch (e: SyntheticEvent) {
        e.preventDefault();
        let searchId: number;
        if (this.state.searchValue.match(/\d+/)) {
            searchId = this.findId();
        } else {
            searchId = this.findName();
        }
        if (searchId === 0) {
            this.setState({ searchValue: '' })
            this.props.onDataError('No record found');
            this.props.onDataLoad(null);
            return;
        }

        this.setState({ isDisabled: true });
        fetch(process.env.REACT_APP_API_URL + "/api/people/" + searchId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onDataLoad(result);
                    this.setState({ isDisabled: false });
                },
                (error) => {
                    this.props.onDataError(error.toString());
                    this.props.onDataLoad(null);
                    this.setState({ isDisabled: false, searchValue: '' });
                }
            );
    }

    changeInput (e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ searchValue: e.currentTarget.value });
    }

    private findId(): number {
        let searchId: number = parseInt(this.state.searchValue);
        for (const swRecord of IDS_TO_NAMES) {
            if (searchId === swRecord.id) {
                return searchId;
            }
        }
        return 0;
    }

    private findName(): number {
        for (const swRecord of IDS_TO_NAMES) {
            if (this.state.searchValue === swRecord.name) {
                return swRecord.id;
            }
        }
        return 0;
    }

    render () {
        return (
            <div className="SearchForm input-group mb-3">
                <input
                    id="search-form"
                    className="form-control"
                    type="text"
                    onChange={this.changeInput}
                    value={this.state.searchValue}
                />
                <button
                    className="btn btn-outline-secondary"
                    onClick={this.doSearch}
                    disabled={this.state.isDisabled}
                >
                    { this.state.isDisabled
                        ? <span>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span>Loading...</span>
                          </span>
                        : <span>Search</span>
                    }
                </button>
            </div>
        );
    }
}
