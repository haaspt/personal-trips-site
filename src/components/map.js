/* global window */
import React, {Component} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {TripsLayer} from '@deck.gl/geo-layers';

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const SEGMENT_DATA = require('../data/trip_data.json');

export const INITIAL_VIEW_STATE = {
  longitude: -122.438,
  latitude: 37.776,
  zoom: 12.5,
  pitch: 15,
  bearing: 0
};

export default class Map extends Component {
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