import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchPropertyDetails from './SearchPropertyDetails';
import SearchPropertyAmmenities from './SearchPropertyAmmenities';
import SearchByAddressOrMLS from './SearchByAddressOrMLS';

class Searchbar extends Component {
  constructor() {
    super()
  }

  validateAndSubmitQuery = () => {
    const { query } = this.props;

    const requiredFields =
      query.details.some(e => e[0] === "typeSet")
      && query.details.some(e => e[0] === "statusSet")
      && query.details.some(e => e[0] === "locationSet")
      && query.details.some(e => e[0] === "priceRangeSet");

    if (requiredFields) {
      axios.post('/api/getSearchResults', query)
        .then(result => {
          console.log(result);
          // if num_records greater than 1 result.data.records will return an array
          console.log(result.data.records[0])
        })
        .catch(error => console.log('Error in query submission', error));
    } else alert('Please complete the required fields (Property-type, Status, Location, Price) ')
    // if(query.details[priceRangeSet] && query.details[typeSet] &&)
  }

  getTestData = () => {
    axios.post('/api/getSearchResults', this.props.query)
      .then(result => {
        const { records } = result.data[0];
        console.log(records)
        // THEN SAVE THE RESULT TO REDUX AND MAKE GLOBAL
        // this.props.saveSearchResults(records) 
      })
  }


  render() {
    return (
      <div style={{
        display: "flex",
        height: "160px",
        backgroundColor: "aqua"
      }}>
        <SearchPropertyDetails />
        <SearchPropertyAmmenities />
        {/* <SearchByAddressOrMLS /> */}
        {/* <button onClick={this.validateAndSubmitQuery}>SEARCH</button> */}
        <button onClick={this.getTestData}>SEARCH</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    query: state.query
  }
}

export default connect(mapStateToProps)(Searchbar);