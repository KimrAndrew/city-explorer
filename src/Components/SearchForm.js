import { Component } from "react";

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    changeHandler = (event) => {
        this.setState({searchText:event.target.value});
    }
    render() {
        return (
            <>
                <input onChange={this.changeHandler} value={this.state.text}></input>
                <button onClick={this.props.searchHandler(this.state.searchText)}>Explore!</button>
            </>
        );
    }
}