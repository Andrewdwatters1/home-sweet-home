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
    console.log('QUERY', this.props.query)
    console.log('USER', this.props.user)
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