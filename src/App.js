import React, { Component } from 'react';
import Main from "./Components/Main";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import './index.css';

class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <Main/>
            <Footer />
        </div>
    )
  }
}


export default App;
