import { Component } from "react";

export default class Movie extends Component {

    render() {
        return <ul>{this.props.movieList}</ul>;
    }
    
}