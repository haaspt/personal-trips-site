/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import Map from './components/map';
import SidePanel from './components/side-panel';
import './index.css';

export class App extends Component {
  render() {
    return (
      <div id='content'>
        <SidePanel />
        <Map />
      </div>
    )
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}

renderToDOM(document.getElementById('app'));