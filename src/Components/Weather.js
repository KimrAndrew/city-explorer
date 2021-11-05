import { Component } from "react";

export default class Weather extends Component {

    render() {
        return <ul>{this.props.weatherList}</ul>;
    }
    
}