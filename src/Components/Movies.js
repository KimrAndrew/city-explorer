import { Component } from "react";
import Row from 'react-bootstrap/Row';
import Movie from './Movie.js';

export default class Movies extends Component {

    render() {
        console.log(this.props.movieList);
        return (
            this.props.movieList.map(movie => <Movie movie={movie}/>)
        )
    }
    
}