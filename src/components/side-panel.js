import React, {Component} from 'react';
import PdfFile from '../assets/pthaas_resume.pdf';

export default class SidePanel extends Component {
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