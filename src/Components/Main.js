import { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.base = 'https://us1.locationiq.com/v1/search.php?';
        this.key = `key=${process.env.REACT_APP_LOCATION_KEY}`;
        this.format=`&format=json`;

        this.state = {
            searchText: '',
            searchQuery: '',
            locationUrl:'',
            mapUrl:'',
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
        this.setState({
            searchQuery: this.state.searchText,
            locationUrl:  await this.assembleLocationUrl(),
        });
        //console.log(this.state.locationUrl);
        let cityData = await axios.get(this.state.locationUrl);
        cityData = cityData.data[0];
        this.setState({cityData: cityData});
        let mapUrl = await this.assembleMapUrl(this.state.cityData);
        this.setState({mapUrl: mapUrl});
        //console.log(this.state.mapUrl);
        //console.log(this.state.cityData);
        
    }

    //getCityData = await axios.get(this.state.locationUrl);

    //getMapData = async () => await axios.get(this.state.mapUrl);
    render() {
        return(
            <>
                <input onChange={this.changeHandler} value={this.state.searchText}></input>
                <button onClick={this.searchHandler}>Search</button>
                <Card style={{ width: '18 rem' }}>
                    <Card.Text>name: {this.state.cityData.display_name}</Card.Text>
                    <Card.Text>lon: {this.state.cityData.lon}</Card.Text>
                    <Card.Text>lat: {this.state.cityData.lat}</Card.Text>
                    <Card.Img variant='bottom' src={this.state.mapUrl} alt='map'/>
                </Card>
            </>
        );
    }
}