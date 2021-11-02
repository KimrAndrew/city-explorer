import { Component } from "react";
import axios from 'axios';
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

    assembleLocationUrl = () => `${this.base}${this.key}&q=${this.state.searchQuery}${this.format}`;

    assembleMapUrl = () => `https://maps.locationiq.com/v3/staticmap?key=${this.key}center=${this.state.cityData.lon},${this.state.cityData.lat}zoom=9`

    changeHandler = event => {
        this.setState({searchText:event.target.value});
    };
    searchHandler =  async () => {
        this.setState({
            searchQuery: this.state.searchText,
            locationUrl: this.assembleLocationUrl(),
            mapUrl: this.assembleMapUrl()
        });
        this.setState({cityData: this.getCityData()});
        this.setState({map: this.getMapData()});
        
    }

    getCityData = async () => await axios.get(this.state.locationUrl);

    getMapData = async () => await axios.get(this.state.mapUrl);
    render() {
        return(
            <>
                <input onChange={this.changeHandler}></input>
                <p>{this.state.cityData.name}</p>
                <p>{this.state.cityData.lon}</p>
                <p>{this.state.cityData.latr}</p>
                <button onClick={this.searchHandler}>Search</button>
            </>
        );
    }
}