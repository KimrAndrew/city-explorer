import { Component } from "react";
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.na = 'https://us1.locationiq.com/v1/search.php?';
        this.eu = 
        this.key = `key=${process.env.WEATHERIQ}`;
        this.format=`&format=json`;

        this.state = {
            searchText: '',
            searchQuery: '',
            cityUrl:'',
            region: this.na
        }
    }

    assembleUrl = () => `${this.state.region}${this.key}${this.state.searchQuery}${this.format}`;

    changeHandler = event => {
        this.setState({searchText:event.target.value});
    };
    searchHandler = () => {
        this.setState({
            searchQuery: this.state.searchText,
            cityUrl: this.assembleUrl()
        });
    }
    render() {
        return(
            <>
                <input onChange={this.changeHandler}></input>
                <p>{this.assembleUrl()}</p>
                <button onClick={this.searchHandler}>Search</button>
            </>
        );
    }
}