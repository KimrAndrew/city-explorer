import { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            cityData: {},
            map: '',
            weatherList: <></>,
            error: false
        }
    }

    assembleLocationUrl = () => `${this.base}${this.key}&q=${this.state.searchText}${this.format}`;

    assembleMapUrl = (cityObj) => `https://maps.locationiq.com/v3/staticmap?${this.key}&center=${cityObj.lat},${cityObj.lon}&zoom=10`;

    changeHandler = event => {
        this.setState({searchText: event.target.value});
    };

    searchHandler = async () => {
        this.setState({
            cityData:{},
            map: '',
            error: false
        });
        try {
            let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchText}&format=json`);
            cityData = cityData.data[0];
            console.log(cityData.lat);
            console.log(cityData.lon);
            let weatherData = await axios.get(`${process.env.REACT_APP_API}weather/?lat=${cityData.lat}&lon=${cityData.lon}`);
            let weatherList = weatherData.data.map(el => {
                return <li> {`date: ${el.date} description: ${el.description}`}</li>
            });
            console.log(weatherData);
            //console.log(cityData);
            this.setState({
                cityData: cityData,
                map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityData.lat},${cityData.lon}&zoom=10`,
                weatherList: weatherList
            });

        } catch(error) {
            this.setState({error:true});
        }
    }

    render() {
        return(
            <>  
                <input onChange={this.changeHandler} value={this.state.searchText}></input>
                <button onClick={this.searchHandler}>Explore!</button>
                <Container>
                {
                this.state.cityData.display_name &&
                <Card style={{ maxWidth: '27rem' }}>
                    <Card.Text>name: {this.state.cityData.display_name}</Card.Text>
                    <Card.Text>lon: {this.state.cityData.lon}</Card.Text>
                    <Card.Text>lat: {this.state.cityData.lat}</Card.Text>
                    <Card.Img variant='bottom' src={this.state.map} alt='map' />
                    <ul>{this.state.weatherList}</ul>
                </Card>
                }
                {
                    this.state.error &&
                    <p>Error: Location not found</p>
                }
                </Container>
            </>
        );
    }
}