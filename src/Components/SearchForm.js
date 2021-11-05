import { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class SearchForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    changeHandler = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    searchHandler = () => {
        this.props.searchHandler(this.state.text);
    }
    
    render() {
        return (
            <>
                <Form>
                    <Form.Control type='text' onChange={this.changeHandler} value={this.props.text}/>
                </Form>
                <Button onClick={this.searchHandler}>Explore!</Button>
            </>
        );
    }
}