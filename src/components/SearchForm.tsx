import React, {Component, SyntheticEvent} from 'react';
import {IDS_TO_NAMES, IdsNames} from "../constants";
import {Person} from "../models";

interface IProps {
    onDataLoad(data: Person | null): any,
    onDataError(apiError: string): any
}

interface IState {
    searchValue: string,
    isDisabled: boolean,
    typeahead: Array<string>
}

export default class SearchForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.state = { searchValue: "", isDisabled: false, typeahead: [] }
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
        if (e.currentTarget.value.length >= 3) {
            const matchingRecords: Array<IdsNames> = IDS_TO_NAMES.filter(
                x => x.name.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())
            );
            const typeaheadData: Array<string> = [];
            matchingRecords.map(record => typeaheadData.push(record.name));
            this.setState({ typeahead: typeaheadData });
        } else {
            this.setState({ typeahead: [] });
        }
    }

    setSuggestion (value: string) {
        this.setState({ searchValue: value });
        this.setState({ typeahead: [] });
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
            <div className="SearchForm mb-3">
                <div className="container">
                    <div className="row">
                        <div className="input-group mb-0 col-12">
                            <input
                                id="search-form"
                                className="form-control"
                                type="text"
                                autoComplete="off"
                                onChange={this.changeInput}
                                value={this.state.searchValue}
                            />
                            <button
                                className="btn btn-outline-primary px-2"
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
                    </div>
                    <div className="row">
                        <div
                            className="list-group mt-2 col-12 "
                            style={{ padding: '0 12px', position: 'relative' }}
                        >
                            <div style={{ width: '100%', display: this.state.typeahead.length > 0 ? 'block' : 'none', position: "absolute", zIndex: 999, paddingRight: '24px' }}>
                                { this.state.typeahead.map((suggestion) =>
                                        <button
                                            className="list-group-item"
                                            style={{ width: '100%', textAlign: 'left' }}
                                            key={ suggestion }
                                            onClick={ () => this.setSuggestion(suggestion) }
                                        >{ suggestion }</button>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
