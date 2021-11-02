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
            cityData: {}
        }
    }

    assembleLocationUrl = () => `${this.base}${this.key}&q=${this.state.searchQuery}${this.format}`;

    changeHandler = event => {
        this.setState({searchText:event.target.value});
    };
    searchHandler =  async () => {
        this.setState({
            searchQuery: this.state.searchText,
            locationUrl: this.assembleLocationUrl(),
        });

        let response = await axios.get(this.state.locationUrl);
        this.setState({cityData:response.data[0]});
        console.log(this.state.cityData);
    }
    render() {
        return(
            <>
                <input onChange={this.changeHandler}></input>
                <p>{this.assembleLocationUrl()}</p>
                <button onClick={this.searchHandler}>Search</button>
            </>
        );
    }
}