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
    // const requiredFields = 1;

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
        <button onClick={this.validateAndSubmitQuery}>SEARCH</button>
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