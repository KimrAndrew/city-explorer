import { Component } from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import SearchForm from './SearchForm.js';
import LocationCard from './LocationCard.js';
import Weather from './Weather';
import Movies from './Movies';
import Alert from 'react-bootstrap/Alert';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityData: {},
            cityName: '',
            map: '',
            weatherList: [],
            movieList: [],
            error: false
        }
    }

    searchHandler = async (query) => {
        this.setState({
            cityData:{},
            map: '',
            cityName: '',
            weatherList: [],
            movieList: [],
            error: false
        });
        try {
            this.getLocationData(query);

            //let movieData = await axios.get(`${process.env.REACT_APP_API}movies/?city_name=${cityName}`);
            //movieData=movieData.data.map(movie => movie.title);
            //movieData = movieData.data;

            //this.setState({
            //    movieList: movieData
            //});
            console.log(this.state.movieList);

        } catch(error) {
            this.handleError(error);
        }
    }

    getLocationData = async(query) => {
        try {
            let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${query}&format=json`);
            cityData = cityData.data[0];
            let cityName = cityData.display_name.split(',')[0];
            this.setState({
                cityData: cityData,
                map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityData.lat},${cityData.lon}&zoom=10`,
                cityName: cityName
            },this.getWeather);
        } catch(error) {
            this.handleError(error)
        }
    }

    handleError = (error) => {
        this.setState({error:error});
    }

    getWeather = async () => {
        try {
            let weatherData = await axios.get(`${process.env.REACT_APP_API}weather/?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`);

            this.setState({
                weatherList: weatherData.data
            },this.getMovies);
        } catch (error) {
            this.handleError(error);
        }
    }

    getMovies = async () => {
        try {
            console.log(`cityname: ${this.state.cityName}`);
            let movieData = await axios.get(`${process.env.REACT_APP_API}movies/?city_name=${this.state.cityName}`);
            movieData = movieData.data;
            console.log(movieData);
            this.setState({
                movieList: movieData
            });
            console.log("state: " + this.state.movieList);
        } catch(error) {
            this.setState({error:error});
        }
    }

    render() {
        return(
            <>  
                <SearchForm searchHandler={this.searchHandler} value={this.state.searchText}/>
                <Container> 
                    { this.state.cityData.display_name && <LocationCard cityData={this.state.cityData} map={this.state.map}/> }
                    { this.state.weatherList && <Weather weatherList={this.state.weatherList }/> }
                    { this.state.movieList.length > 0 && <Movies movieList={this.state.movieList}/>}

                {
                    this.state.error &&
                    <Alert variant='danger' onClose={() => this.setState({error:false})} dismissable>
                        <Alert.Heading>{this.state.error.name + ': ' + this.state.error.message}</Alert.Heading>
                    </Alert>
                }
                </Container>
            </>
        );
    }
}