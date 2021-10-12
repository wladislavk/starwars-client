export interface Person {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    gender: string,
    birth_year: string,
    homeworld: Planet,
    species: Array<Species>,
    films: Array<Film>
}

export interface Planet {
    name: string,
    terrain: string,
    population: string
}

export interface Species {
    name: string,
    average_lifespan: string,
    classification: string,
    language: string
}

export interface Film {
    title: string,
    director: string,
    producer: string,
    release_date: Date
}
