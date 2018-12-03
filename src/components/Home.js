import React, { Component } from 'react';
import { connect } from 'react-redux';

import Searchbar from './Searchbar';
import ResultsList from './ResultsList';
import PropertyContainer from './propertyContainer/PropertyContainer';

class Home extends Component {

  render() {
    // console.log(this.props.query.selectedSearchResult);
    return (
      <div>
        {!this.props.query.searchResults ?
          <Searchbar />
          :
          <div>
            <Searchbar />
            <div className="home-main">
              <PropertyContainer />
              <ResultsList />
            </div>
          </div>
        }
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
export default connect(mapStateToProps)(Home);
