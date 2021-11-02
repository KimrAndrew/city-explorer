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

    assembleLocationUrl = () => `${this.base}${this.key}&q=${this.state.searchText}${this.format}`;

    //assembleMapUrl = () => `https://maps.locationiq.com/v3/staticmap?${this.key}center=${this.state.cityData.lon},${this.state.cityData.lat}zoom=9`

    changeHandler = event => {
        this.setState({searchText: event.target.value});
    };

    searchHandler = async () => {
        this.setState({
            searchQuery: this.state.searchText,
            locationUrl:  await this.assembleLocationUrl()
            //mapUrl: this.assembleMapUrl()
        });
        console.log(this.state.locationUrl);
        let cityData = await axios.get(this.state.locationUrl);
        cityData = cityData.data[0];
        this.setState({cityData: cityData});
        //this.setState({map: this.getMapData()});
        console.log(this.state.cityData);
        
    }

    //getCityData = await axios.get(this.state.locationUrl);

    getMapData = async () => await axios.get(this.state.mapUrl);
    render() {
        return(
            <>
                <input onChange={this.changeHandler} value={this.state.searchText}></input>
                <p>{this.state.cityData.name}</p>
                <p>{this.state.cityData.lon}</p>
                <p>{this.state.cityData.latr}</p>
                <button onClick={this.searchHandler}>Search</button>
            </>
        );
    }
}