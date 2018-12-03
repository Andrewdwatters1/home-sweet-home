import React, { Component } from 'react';

import Overview from './Overview';
import Photos from './Photos';
import Pricing from './Pricing';
import Location from './Location';
import Neighborhood from './Neighborhood';

export default class PropertyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      overview: true,
      photos: false,
      location: false,
      pricing: false,
      neighborhood: false
    }
  }

  updateComponent = tgt => {
    if (tgt === 'overview') {
      this.setState({
        overview: true,
        photos: false,
        location: false,
        pricing: false,
        neighborhood: false
      })
    } else if (tgt === 'photos') {
      this.setState({
        overview: false,
        photos: true,
        location: false,
        pricing: false,
        neighborhood: false
      })
    } else if (tgt === 'location') {
      this.setState({
        overview: false,
        photos: false,
        location: true,
        pricing: false,
        neighborhood: false
      })
    } else if (tgt === 'pricing') {
      this.setState({
        overview: false,
        photos: false,
        location: false,
        pricing: true,
        neighborhood: false
      })
    } else if (tgt === 'neighborhood') {
      this.setState({
        overview: false,
        photos: false,
        location: false,
        pricing: false,
        neighborhood: true
      })
    }
  }

  render() {
    return (
      <div className="property-container-outer">
        <span>
          <button onClick={(tgt) => this.updateComponent('overview')}></button>
          <button onClick={(tgt) => this.updateComponent('photos')}></button>
          <button onClick={(tgt) => this.updateComponent('pricing')}></button>
          <button onClick={(tgt) => this.updateComponent('location')}></button>
          <button onClick={(tgt) => this.updateComponent('neighborhood')}></button>
        </span>

        {this.state.overview && <Overview />}
        {this.state.photos && <Photos />}
        {this.state.pricing && <Pricing />}
        {this.state.location && <Location />}
        {this.state.neighborhood && <Neighborhood />}

      </div>
    )
  }
}
