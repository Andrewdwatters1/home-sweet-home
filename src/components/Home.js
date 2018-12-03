import React, { Component } from 'react';
import { connect } from 'react-redux';

import Searchbar from './Searchbar';
import ResultsList from './ResultsList';
import PropertyContainer from './propertyContainer/PropertyContainer';
import { updateSelectedResult } from '../redux/reducers/query';

class Home extends Component {

  updateSelectedResult = (tgt) => {
    this.props.updateSelectedResult(tgt)
  }

  render() {
    console.log(this.props.query.selectedSearchResult);
    return (
      <div>
        {!this.props.query.searchResults ?
          <Searchbar />
          :
          <div>
            <Searchbar />
            <div className="home-main">
              <PropertyContainer updateSelectedResult={this.updateSelectedResult} />
              <ResultsList updateSelectedResult={this.updateSelectedResult} />
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
export default connect(mapStateToProps, { updateSelectedResult })(Home);
