import React, { Component } from 'react';
import { connect } from 'react-redux';

class Overview extends Component {

  render() {
    const { searchResults, selectedSearchResult, searchQuery } = this.props.query;
    let property = searchResults[selectedSearchResult ? selectedSearchResult : 0];
    // ALT => COULD SHOW MEDIAN SALE PRICE, RATINGS, ETC
    // console.log(property);

    return (
      <div className="property-overview-outer">
        overview
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    query: state.query,
  }
}

export default connect(mapStateToProps)(Overview);


// ** 3081 S Laredo Cir
// ** Aurora, CO 80013

// **   Price
// **   $339,900

// **   Beds
// **   3
// **   Baths
// **   1.75

// **   Sq. Ft.
// **   1,632 

//      Price Per Sq. Ft.
//      $208

//      Built: 1973
//      Lot Size: 9,191 Sq. Ft.

//      On Redfin: 82 days

// ** S tatus: For Sale