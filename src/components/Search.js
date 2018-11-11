import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props)
  }


  // ex multi field query w/ AND: query": "city:Austin AND numBathroom:2"
  //    note: can also use OR
  // ex city "query": "city:(Austin OR Houston OR Dallas)"
  // ex query to ensure all values have price: "query": "prices:*"
  // ex query to search date range: "query": "dateAdded:[2017-01-01 TO 2017-02-01]"
  // ex query to search unbounded date range: "query": "dateAdded:[2017-01-01 TO *]"


  // --- POSSIBLE VALUES FOR "propertyType": 
  // Single Family Home: 
  //   Home, 
  //   House,
  //   Single Family Dwelling
  //   Residential 
  // Condo/Townhome
  //   Condo
  //   Townhouse 
  // Apartment/Complex
  //   Apartment
  //   Apartments
  //   Dorm
  //   Hostel*
  //   Motels
  //   Rental Unit
  //   Room
  //   Unit 
  // New Build/Manufactured
  //   Manufactured Home
  //   Mobile Home
  // Commercial/Rental
  //   Apartment Building
  //   Bed Breakfast
  //   Boat
  //   Boat Slip
  //   Building
  //   Commercial*
  //   Condo Building
  //   Duplex
  //   Industrial
  //   Inns 
  //   Multi-Family Dwelling
  //   Quadruplex
  //   Rental Unit Building
  //   Triplex 
  // Land
  //   Land
  //   Farm
  //   Island
  // Other
  //   Bungalow
  //   Cabin
  //   Camper/RV
  //   Campgrounds
  //   Castle
  //   Cave
  //   Cottages
  //   Development Site
  //   Hut
  //   Igloo
  //   Lodges 
  //   Nature Lodge
  //   Resorts 
  //   Tent 
  //   Tipi 
  //   Vacation Rental 
  //   Villa* 

  // -- POSSIBLE VALUES FOR "statuses.type":
  // Short Term Rental
  // Rental
  // For Sale
  // Rent To Own
  // Not For Sale
  // Sold

  render() {
    return (
      <div>
        I am the searchbar
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Search);