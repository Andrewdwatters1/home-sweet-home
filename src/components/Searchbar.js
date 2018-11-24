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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Searchbar);