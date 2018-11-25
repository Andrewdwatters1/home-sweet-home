import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SearchPropertyAmmenities extends Component {
  constructor() {
    super()
    this.state = {
      bedsPossValues: ['Studio', '1', '2', '3', '4', '5+'],
      bedsMinIndex: -1,
      bedsMin: "",
      bedsMaxIndex: -1,
      bedsMin: "",
    }
  }

  handleBedsChange = (e) => {
    const { name, value } = e.target;
    const index = this.state.bedsPossValues.findIndex(e => e === value);
    const valueToSet = `${name}Index`;
    this.setState({
      [name]: value,
      [valueToSet]: index
    })
  }

  render() {
    return (
      <div>



        <div name="bedrooms">
          <label for="bedrooms"># bedrooms</label>

          <label for="bedsMin">Min</label>
          <select name="bedsMin" onChange={this.handleBedsChange} value={this.state.bedsMin}>
            <option value="noMin">No min</option>
            {this.state.bedsPossValues
              .filter((e, i) => this.state.bedsMaxIndex > 0 ? i < this.state.bedsMaxIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>

          <label for="bedsMax">Max</label>
          <select name="bedsMax" onChange={this.handleBedsChange} value={this.state.bedsMax}>
            <option value="noMax">No max</option>
            {this.state.bedsPossValues
              .filter((e, i) => this.state.bedsMinIndex > -1 ? i > this.state.bedsMinIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
        </div>


        <div>
          {/* BATHROOMS */}
        </div>


        <div>
          {/* SQUARE FEET */}
        </div>


        <div>
          {/* LOT SIZE */}
        </div>


        <div>
          {/* PARKING */}
        </div>


        <div>
          {/* PETS */}
        </div>


        Search Property Ammenities
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SearchPropertyAmmenities);


