import { Component } from "react";
import Card from 'react-bootstrap/Card';

export default class LocationCard extends Component {
    render() {
        return (
            <Card style={{ maxWidth: '27rem' }}>
                <Card.Text>name: {this.props.cityData.display_name}</Card.Text>
                <Card.Text>lon: {this.props.cityData.lon}</Card.Text>
                <Card.Text>lat: {this.props.cityData.lat}</Card.Text>
                <Card.Img variant='bottom' src={this.props.map} alt='map' />
            </Card>
        )
    }
}