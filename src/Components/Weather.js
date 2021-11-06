import { Component } from "react";
import Row from 'react-bootstrap/Row';
import WeatherDay from './WeatherDay.js';

export default class Weather extends Component {

    render() {
        return <Row xs={1} sm={2} md={3}>{this.props.weatherList.map((day,idx) => <WeatherDay data={day} key={idx}/>)}</Row>;
    }

}