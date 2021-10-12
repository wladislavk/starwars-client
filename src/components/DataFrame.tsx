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
                <div>
                    <div>Name:</div>
                    <div>{ this.props.apiData?.name }</div>
                </div>
                <div>
                    <div>Height:</div>
                    <div>{ this.props.apiData?.height }</div>
                </div>
                <div>
                    <div>Mass:</div>
                    <div>{ this.props.apiData?.mass }</div>
                </div>
                <div>
                    <div>Hair Color:</div>
                    <div>{ this.props.apiData?.hair_color }</div>
                </div>
                <div>
                    <div>Skin Color:</div>
                    <div>{ this.props.apiData?.skin_color }</div>
                </div>
                <div>
                    <div>Gender:</div>
                    <div>{ this.props.apiData?.gender }</div>
                </div>
                <div>
                    <div>Birth Year:</div>
                    <div>{ this.props.apiData?.birth_year }</div>
                </div>
                <div>
                    <div>Home Planet:</div>
                    <div>
                        <div>
                            <div>Name:</div>
                            <div>{ this.props.apiData?.homeworld.name }</div>
                        </div>
                        <div>
                            <div>Terrain:</div>
                            <div>{ this.props.apiData?.homeworld.terrain }</div>
                        </div>
                        <div>
                            <div>Population:</div>
                            <div>{ this.props.apiData?.homeworld.population }</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Species:</div>
                    <div>
                        { this.props.apiData?.species.map((species) =>
                            <div>
                                <div>
                                    <div>Name:</div>
                                    <div>{ species.name }</div>
                                </div>
                                <div>
                                    <div>Average Lifespan:</div>
                                    <div>{ species.average_lifespan }</div>
                                </div>
                                <div>
                                    <div>Classification:</div>
                                    <div>{ species.classification }</div>
                                </div>
                                <div>
                                    <div>Language:</div>
                                    <div>{ species.language }</div>
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
                <div>
                    <div>Films:</div>
                    <div>
                        { this.props.apiData?.films.map((film) =>
                            <div>
                                <div>
                                    <div>Title:</div>
                                    <div>{ film.title }</div>
                                </div>
                                <div>
                                    <div>Director:</div>
                                    <div>{ film.director }</div>
                                </div>
                                <div>
                                    <div>Producers:</div>
                                    <div>{ film.producer }</div>
                                </div>
                                <div>
                                    <div>Release Date:</div>
                                    <div>{ film.release_date.toDateString() }</div>
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        );
    }
}
