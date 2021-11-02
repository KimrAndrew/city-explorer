import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchQuery: ''
        }
    }
    changeHandler = event => {
        this.setState({searchText:event.target.value});
    };
    searchHandler = event => {
        this.setState({searchQuery: this.state.searchText});
    }
    render() {
        return(
            <>
                <input onChange={this.changeHandler}></input>
                <p>{this.state.searchQuery}</p>
                <button onClick={this.searchHandler}>Search</button>
            </>
        );
    }
}