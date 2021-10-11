import React, { Component } from 'react';
import {Person} from "../models";

interface IProps {
    apiData: Person | null
}

interface IState {}

export default class DataFrame extends Component<IProps, IState> {
    render () {
        return (
            <div className="DataFrame">
                { this.props.apiData }
            </div>
        );
    }
}
