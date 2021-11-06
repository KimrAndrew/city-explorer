import { Component } from "react";
import Card from 'react-bootstrap/Card';

export default class WeatherDay extends Component {

    render() {

        return (
            <Card style={{width: '18rem'}}>
                <Card.Img src={`https://www.weatherbit.io/static/img/icons/${this.props.data.icon}.png`} alt={this.props.data.description} />
                <Card.Title>
                    <h3>{this.props.data.description}</h3>
                </Card.Title>
            </Card>
        )
    }
}