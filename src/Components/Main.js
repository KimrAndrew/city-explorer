import { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            cityData: {},
            map: ''
        }
    }

    assembleLocationUrl = () => `${this.base}${this.key}&q=${this.state.searchText}${this.format}`;

    assembleMapUrl = (cityObj) => `https://maps.locationiq.com/v3/staticmap?${this.key}&center=${cityObj.lat},${cityObj.lon}&zoom=10`;

    changeHandler = event => {
        this.setState({searchText: event.target.value});
    };

    searchHandler = async () => {
        let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchText}&format=json`);
        cityData = cityData.data[0];
        console.log(cityData);
        this.setState({
            cityData: cityData,
            map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityData.lat},${cityData.lon}&zoom=10`
        });
    }

    render() {
        return(
            <>
                <input onChange={this.changeHandler} value={this.state.searchText}></input>
                <button onClick={this.searchHandler}>Search</button>
                <Card style={{ width: '18 rem' }}>
                    <Card.Text>name: {this.state.cityData.display_name}</Card.Text>
                    <Card.Text>lon: {this.state.cityData.lon}</Card.Text>
                    <Card.Text>lat: {this.state.cityData.lat}</Card.Text>
                    <Card.Img variant='bottom' src={this.state.map} alt='map'/>
                </Card>
            </>
        );
    }
}