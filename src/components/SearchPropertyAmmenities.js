import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SearchPropertyAmmenities extends Component {
  constructor() {
    super()
    this.state = {
      // BEDS
      bedsPossValues: ['Studio', '1', '2', '3', '4', '5+'],
      bedsMinIndex: -1,
      bedsMin: "",
      bedsMaxIndex: -1,
      bedsMin: "",

      // BATHS
      baths: 0,

      // SQUARE FEET
      sqftPossValues: ['500', '600', '700', '800', '900', '1,000', '1,250', '1,500', '1,750', '2,000', '2,250', '2,500', '2,750', '3,000', '3,500', '4,000', '4,500', '5,000+'],
      sqftMinIndex: -1,
      sqftMin: "",
      sqftMaxIndex: -1,
      sqftMin: "",

      // LOT SIZE
      lotSizePossValues: ['2,000 sq ft', '4,000 sq ft', '6,000 sq ft', '8,000 sq ft', '.25 acres', '.5 acres', '.75 acres', '1 acre', '1.5 acres', '2 acres', '3 acres', '4 acres', '5 acres', '10 acres', '20 acres', '50 acres+'],
      lotSizeMinIndex: -1,
      lotSizeMin: "",
      lotSizeMaxIndex: -1,
      lotSizeMin: "",

      // PARKING
      parkingSpaces: 0,

      // PETS
      pets: false,

      // FEES
      fees: '',

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

  handleBathsChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSqftChange = (e) => {
    const { name, value } = e.target;
    const index = this.state.sqftPossValues.findIndex(e => e === value);
    const valueToSet = `${name}Index`;
    this.setState({
      [name]: value,
      [valueToSet]: index
    })
  }

  handleLotSizeChange = (e) => {
    const { name, value } = e.target;
    const index = this.state.lotSizePossValues.findIndex(e => e === value);
    const valueToSet = `${name}Index`;
    this.setState({
      [name]: value,
      [valueToSet]: index
    })
  }

  handleParkingChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handlePetsChange = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked
    })
  }

  handleFeesChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Property Ammenities/Features</h2>

        <div name="bedrooms">
          <label for="bedrooms"># bedrooms</label>

          <label for="bedsMin">Min</label>
          <select name="bedsMin" onChange={this.handleBedsChange} value={this.state.bedsMin}>
            <option value="">No min</option>
            {this.state.bedsPossValues
              .filter((e, i) => this.state.bedsMaxIndex > 0 ? i < this.state.bedsMaxIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>

          <label for="bedsMax">Max</label>
          <select name="bedsMax" onChange={this.handleBedsChange} value={this.state.bedsMax}>
            <option value="">No max</option>
            {this.state.bedsPossValues
              .filter((e, i) => this.state.bedsMinIndex > -1 ? i > this.state.bedsMinIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
        </div>


        <div name="bathrooms">
          <label for="bathrooms"># bathrooms</label>
          <select name="baths" onChange={this.handleBathsChange} value={this.state.baths}>
            <option value="" defaultValue>No min</option>
            <option value="1">1+</option>
            <option value="1.25">1.25+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>


        <div name="square-feet">
          <label for="square-feet">Square Feet</label>

          <label for="sqftMin">Min</label>
          <select name="sqftMin" onChange={this.handleSqftChange} value={this.state.sqftMin}>
            <option value="">No min</option>
            {this.state.sqftPossValues
              .filter((e, i) => this.state.sqftMaxIndex > 0 ? i < this.state.sqftMaxIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
          <label for="sqftMax">Max</label>
          <select name="sqftMax" onChange={this.handleSqftChange} value={this.state.sqftMax}>
            <option value="">No max</option>
            {this.state.sqftPossValues
              .filter((e, i) => this.state.sqftMinIndex > -1 ? i > this.state.sqftMinIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
        </div>


        <div name="lot-size">
          <label for="lot-size">Lot Size</label>

          <label for="lotSizeMin">Min</label>
          <select name="lotSizeMin" onChange={this.handleLotSizeChange} value={this.state.lotSizeMin}>
            <option value="">No min</option>
            {this.state.lotSizePossValues
              .filter((e, i) => this.state.lotSizeMaxIndex > 0 ? i < this.state.lotSizeMaxIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
          <label for="lotSizeMax">Max</label>
          <select name="lotSizeMax" onChange={this.handlelotSizeChange} value={this.state.lotSizeMax}>
            <option value="">No max</option>
            {this.state.lotSizePossValues
              .filter((e, i) => this.state.lotSizeMinIndex > -1 ? i > this.state.lotSizeMinIndex : e)
              .map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
          </select>
        </div>


        <div name="parking">
          <label for="parking">Parking Spaces</label>
          <select name="parkingSpaces" onChange={this.handleParkingChange} value={this.state.parkingSpaces}>
            <option value="" defaultValue>No min</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>


        <div>
          <label for="pets">Pets Allowed</label>
          <input name="pets" type="checkbox" value={this.state.pets} onChange={this.handlePetsChange} />
        </div>


        <div>
          {/* KEYWORDS */}
        </div>


        <div>
          <label for="fees">Max Fees/HOA</label>
          <select value={this.state.fees} onChange={this.handleFeesChange} name="fees">
            <option value="">No max</option>
            <option value="0">No Fees/HOA</option>
            <option value="25">$25/month</option>
            <option value="50">$50/month</option>
            <option value="75">$75/month</option>
            <option value="100">$100/month</option>
            <option value="150">$150/month</option>
            <option value="200">$200/month</option>
            <option value="250">$250/month</option>
            <option value="300">$300/month</option>
            <option value="400">$400/month</option>
            <option value="500">$500/month</option>
            <option value="600">$600/month</option>
            <option value="700">$700/month</option>
            <option value="800">$800/month</option>
            <option value="900">$900/month</option>
            <option value="1000">$1000/month</option>
          </select>
        </div>
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


