import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    )
  }
}
