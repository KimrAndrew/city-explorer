import { Component } from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import SearchForm from './SearchForm.js';
import LocationCard from './LocationCard.js';
import Weather from './Weather';
import Movie from './Movie';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityData: {},
            map: '',
            weatherList: <></>,
            error: false
        }
    }

    searchHandler = async (query) => {
        this.setState({
            cityData:{},
            map: '',
            error: false
        });
        try {
            let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${query}&format=json`);
            cityData = cityData.data[0];
            console.log(cityData.lat);
            console.log(cityData.lon);

            this.setState({
                cityData: cityData,
                map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityData.lat},${cityData.lon}&zoom=10`
            });

            let weatherData = await axios.get(`${process.env.REACT_APP_API}weather/?lat=${cityData.lat}&lon=${cityData.lon}`);
            let weatherList = weatherData.data.map((el) => {
                return <li key={el.date}> {`date: ${el.date} description: ${el.description}`}</li>
            });

            console.log(this.state.cityData);
            this.setState({
                weatherList: weatherList
            });
            let cityName = this.state.cityData.display_name.split(',')[0];
            console.log("city name:" + cityName);
            let movieData = await axios.get(`${process.env.REACT_APP_API}movies/?city_name=${cityName}`);
            movieData=movieData.data.map(movie => movie.title);

            //console.log(cityData);
            console.log(movieData);
            this.setState({
                movieList: movieData
            });

        } catch(error) {
            this.setState({error:true});
        }
    }

    render() {
        return(
            <>  
                <SearchForm searchHandler={this.searchHandler} value={this.state.searchText}/>
                <Container> 
                    { this.state.cityData.display_name && <LocationCard cityData={this.state.cityData} map={this.state.map}/> }
                    { this.state.weatherList && <Weather weatherList={this.state.weatherList}/> }
                    { this.state.movieList && <Movie movieList={this.state.movieList}/> }

                {
                    this.state.error &&
                    <p>Error: Location not found</p>
                }
                </Container>
            </>
        );
    }
}