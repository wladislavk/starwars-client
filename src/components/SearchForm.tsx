import React, {Component, SyntheticEvent} from 'react';
import {IDS_TO_NAMES} from "../constants";
import {Person} from "../models";

interface IProps {
    onDataLoad(data: Person): any
}

interface IState {
    searchValue: string,
}

export default class SearchForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.doSearch = this.doSearch.bind(this);
    }

    doSearch (e: SyntheticEvent) {
        e.preventDefault();
        let searchId: number = 0;
        if (this.state.searchValue.match(/\d+/)) {
            searchId = this.findId();
        } else {
            searchId = this.findName();
        }
        if (searchId === 0) {
            console.error('No record found');
            return;
        }

        fetch(process.env.REACT_APP_API_URL + "/api/" + searchId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onDataLoad(result.data)
                },
                (error) => {
                    console.error(error);
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
            <div className="SearchForm">
                <input id="search-form" type="text" onChange={this.changeInput} />
                <input type="button" value="Search" onClick={this.doSearch} />
            </div>
        );
    }
}
