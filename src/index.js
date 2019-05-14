/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {TripsLayer} from '@deck.gl/geo-layers';
import './index.css';
import PdfFile from './pthaas_resume.pdf';

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const SEGMENT_DATA = require('../data/trip_data.json');

export const INITIAL_VIEW_STATE = {
  longitude: -122.438,
  latitude: 37.776,
  zoom: 12.5,
  pitch: 15,
  bearing: 0
};

class SidePanel extends Component {
  render () {
    return (
      <div id="side-panel">
        <h1>Patrick Tyler Haas</h1>
        <h3>A little about me</h3>
        <p>Hi!</p>
        <p>I'm a data scientist, currently at <a href="https://scoot.co/">Scoot</a>, formerly in the NGO sector, before that I was an archaeologist. I specialize in operations and geospatial analysis (and making cool maps). I’m passionate about data for good, urban mobility, and things that generally make the world more equitable.</p>
        <p>Check out my <a href="https://github.com/haaspt">GitHub</a> to see other things I’ve built, or my <a href="https://www.linkedin.com/in/ptylerhaas/">LinkedIn</a> for more about what I’ve worked on, or just check out my <a href={PdfFile} target='_blank'>resume</a>.</p>
        <hr />
        <h3>What am I looking at?</h3>
        <p>This is a time-lapse of several years’ worth of my own commute data via <span class="red">bike</span> and <span class="blue">Scoot</span>, over 1,000 ride traces. The traces have been overlaid into a single 24 hour period, which plays in a 2 minute loop.</p>
        <p>I built this page with React and <a href="https://deck.gl/">deck.gl</a> on top of a Mapbox base map.The data was parsed, filtered, and formatted using Python. Check out the source <a href="https://github.com/haaspt/personal-trips-site">here</a>.</p>
      </div>
    )
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this._animate();
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _animate() {
    const {
      loopLength = 86400, // unit corresponds to the timestamp in source data
      animationSpeed = 480 // unit time per second
    } = this.props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  }

  _renderLayers() {
    const {trips = SEGMENT_DATA, trailLength = 270} = this.props;

    return [
      new TripsLayer({
        id: 'trips',
        data: trips,
        getPath: d => d.segments,
        getColor: d => (d.type === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.8,
        widthMinPixels: 4,
        rounded: true,
        trailLength,
        currentTime: this.state.time
      })
    ];
  }

  render() {
    const {viewState, controller = true, baseMap = true} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
      >
        {baseMap && (
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/pthaas/cjvkfn3c51tlo1cpaibddbusi"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        )}
      </DeckGL>
    );
  }
}

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