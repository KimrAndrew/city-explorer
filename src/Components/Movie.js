import { Component } from "react";
import Card from 'react-bootstrap/Card';

export default class Movie extends Component {

    render() {
        console.log(this.props.movie.poster_path);
        return (
            <Card style={{width: '18rem'}}>
            <Card.Img src={this.props.movie.poster_path} alt={this.props.movie.title} />
            <Card.Title>
                <h3>{this.props.movie.title}</h3>
            </Card.Title>
            </Card>
        )
    }
}