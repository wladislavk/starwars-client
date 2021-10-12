import React, { Component } from 'react';
import { DateTime } from 'luxon';
import {Person} from "../models";
import './DataFrame.css';

interface IProps {
    apiData: Person | null
}

interface IState {}

export default class DataFrame extends Component<IProps, IState> {
    formatDate (date: string) {
        const luxonDate = DateTime.fromISO(date);
        return `${luxonDate.day} ${luxonDate.monthShort} ${luxonDate.year}`;
    }

    render () {
        return (
            <div className="DataFrame container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary" style={{ margin: '5px 0' }}>
                            <div className="card-header bg-primary text-white">
                                { this.props.apiData?.name }
                            </div>
                            <div className="card-body" style={{ padding: 0 }}>
                                <div className="container px-0 overflow-hidden main-card">
                                    <div className="row">
                                        <div className="col">Height:</div>
                                        <div className="col">{ this.props.apiData?.height }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Mass:</div>
                                        <div className="col">{ this.props.apiData?.mass }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Hair Color:</div>
                                        <div className="col">{ this.props.apiData?.hair_color }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Skin Color:</div>
                                        <div className="col">{ this.props.apiData?.skin_color }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Gender:</div>
                                        <div className="col">{ this.props.apiData?.gender }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Birth Year:</div>
                                        <div className="col">{ this.props.apiData?.birth_year }</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Home Planet:</div>
                                        <div className="col">
                                            <div className="card border-success" style={{ margin: '5px 0' }}>
                                                <div className="card-header bg-success text-white">
                                                    <div>{ this.props.apiData?.homeworld.name }</div>
                                                </div>
                                                <div className="card-body" style={{ padding: 0 }}>
                                                    <div className="container px-0 overflow-hidden secondary-card">
                                                        <div className="row">
                                                            <div className="col">Terrain:</div>
                                                            <div className="col">{ this.props.apiData?.homeworld.terrain }</div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">Population:</div>
                                                            <div className="col">{ this.props.apiData?.homeworld.population }</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Species:</div>
                                        <div className="col">
                                            { this.props.apiData?.species.map((species) =>
                                                <div key={ species.name } className="card border-info" style={{ margin: '5px 0' }}>
                                                    <div className="card-header bg-info text-white">
                                                        <div>{ species.name }</div>
                                                    </div>
                                                    <div className="card-body" style={{ padding: 0 }}>
                                                        <div className="container px-0 overflow-hidden secondary-card">
                                                            <div className="row">
                                                                <div className="col">Average Lifespan:</div>
                                                                <div className="col">{ species.average_lifespan }</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">Classification:</div>
                                                                <div className="col">{ species.classification }</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">Language:</div>
                                                                <div className="col">{ species.language }</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Films:</div>
                                        <div className="col">
                                            { this.props.apiData?.films.map((film) =>
                                                <div key={ film.title } className="card border-secondary" style={{ margin: '5px 0' }}>
                                                    <div className="card-header bg-secondary text-white">
                                                        <div>{ film.title }</div>
                                                    </div>
                                                    <div className="card-body" style={{ padding: 0 }}>
                                                        <div className="container px-0 overflow-hidden secondary-card">
                                                            <div className="row">
                                                                <div className="col">Director:</div>
                                                                <div className="col">{ film.director }</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">Producers:</div>
                                                                <div className="col">{ film.producer }</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">Release Date:</div>
                                                                <div className="col">{ this.formatDate(film.release_date) }</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
