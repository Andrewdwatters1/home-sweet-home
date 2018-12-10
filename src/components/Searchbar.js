import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchPropertyDetails from './SearchPropertyDetails';
import SearchPropertyAmmenities from './SearchPropertyAmmenities';
import SearchByAddressOrMLS from './SearchByAddressOrMLS';
import { retainSubmittedQuery, saveSearchResults } from '../redux/reducers/query';

class Searchbar extends Component {
  constructor() {
    super()
  }

  validateAndSubmitQuery = () => {
    const { searchQuery } = this.props.query;
    const { state } = this.props.user;

    if (searchQuery && searchQuery.details) {
      var statusExists = searchQuery.details.some(e => e[0] === 'statusSet');
      var type = searchQuery.details.some(e => e[0] === 'typeSet');
      if (!statusExists) searchQuery.allStatuses = true;
      if (!type) searchQuery.allTypes = true;

      axios.post('/api/getSearchResults', { ...searchQuery, state })
        .then(result => {
          console.log(result);
          // if num_records greater than 1 result.data.records will return an array
          console.log(result.data.records[0])
        })
        .catch(error => console.log('Error in query submission', error));
      this.props.retainSubmittedQuery({ ...this.props.query, ...this.props.user });
    } else {
      axios.post('/api/getSearchResults', { state, allStatuses: true, allTypes: true })
        .then(result => {
          console.log(result);
          console.log(result.data.records[0]);
        })
        .catch(error => console.log('Error in query submission', error));
      this.props.retainSubmittedQuery({ ...this.props.query, ...this.props.user });
    }
  }

  getTestData = () => {
    axios.post('/api/getSearchResults', this.props.query)
      .then(result => {
        // console.log(result)
        const { records } = result.data[0];
        // console.log(records);
        if (records) this.props.saveSearchResults(records)
      })
  }


  render() {
    return (
      <div>
        {
          !this.props.query.searchResults ?
            <div className="initial-search-searchbar">

              <div className="initial-search-searchbar-content">
                <SearchPropertyDetails />
                <SearchPropertyAmmenities />
                {/* <SearchByAddressOrMLS /> */}
              </div>


              <div>
                <button onClick={this.validateAndSubmitQuery}>SEARCH</button>
                {/* <button onClick={this.getTestData}>SEARCH</button> */}
              </div>

            </div>

            :

            <div className="post-search-searchbar">
              <SearchPropertyDetails />
              <SearchPropertyAmmenities />
              {/* <SearchByAddressOrMLS /> */}
              <button onClick={this.validateAndSubmitQuery}>SEARCH</button>
              {/* <button onClick={this.getTestData}>SEARCH</button> */}
            </div>
        }
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

export default connect(mapStateToProps, { saveSearchResults, retainSubmittedQuery })(Searchbar);