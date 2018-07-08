import React, {Component} from 'react';
import './index.css';

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=f12fad38445dcbe07205ca2571cbdd14&language=fr-FR&page=1')
            .then(response => response.json())
            .then(data => {
                    const results = data.results;
                    this.setState({movies: results});
                }
            );
    }

    componentWillUnmount() {
    }

    render() {

        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'pink'
        };
        const {movies} = this.state;
        const movieTop3 = [];
        movies.forEach((element, index) => {
            if (index <= 2) {
                movieTop3.push(element);
            }
        });
        const urlSrcImage = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
        return (
            <div className="containerMovie">
                {
                    movieTop3.map(movie =>
                    <div key={movie.id} className="contentMovie">
                        <h4 className="titleMovie">{movie.title}</h4>
                        <p>Notes: {movie.vote_average}</p>
                        <img src={urlSrcImage + movie.poster_path} max-width="50px" className="poster-movie"/>
                    </div>
                )
                }
            </div>
        );
    }

}

export default Clock;
