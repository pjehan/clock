import React, {Component} from 'react';
import './index.css';

class MovieDB extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: [], counter: 0};
    }

    componentDidMount() {
        const { ApiKey } = this.props;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=fr-FR&page=1`)
            .then(response => response.json())
            .then(data => {
                    this.setState({movies: data.results});
                    this.timer = setInterval(() => {
                        const { movies, counter } = this.state;
                        this.props.animate().then(() => this.setState({counter: ((counter + 1) * 3) >= movies.length ? 0 : counter + 1}));
                    }, this.props.refreshInterval || 5000);
                }
            );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'pink'
        };

        const { movies, counter } = this.state;
        const offset = 3 * counter;
        const urlSrcImage = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

        const items = movies.slice(offset, offset + 3).map(movie => (
          <div key={movie.id} className="contentMovie">
            <h4 className="titleMovie">{movie.title}</h4>
            <p>Notes: {movie.vote_average}</p>
            <img src={urlSrcImage + movie.poster_path} max-width="50px" className="poster-movie"/>
          </div>
        ));

        return (
            <div className="containerMovie">
                {items}
            </div>
        );
    }

}

export default MovieDB;
