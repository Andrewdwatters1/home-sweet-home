import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchPropertyDetails from './SearchPropertyDetails';
import SearchPropertyAmmenities from './SearchPropertyAmmenities';
import SearchByAddressOrMLS from './SearchByAddressOrMLS';
import { saveSearchResults } from '../redux/reducers/query';

class Searchbar extends Component {
  constructor() {
    super()
  }

  validateAndSubmitQuery = () => {
    const { query } = this.props;
    const { state } = this.props.user;

    if (query && query.details) {
      var statusExists = query.details.some(e => e[0] === 'statusSet');
      var type = query.details.some(e => e[0] === 'typeSet');
      if (!statusExists) query.allStatuses = true;
      if (!type) query.allTypes = true;

      axios.post('/api/getSearchResults', { ...query, state })
        .then(result => {
          console.log(result);
          // if num_records greater than 1 result.data.records will return an array
          console.log(result.data.records[0])
        })
        .catch(error => console.log('Error in query submission', error));
      // this.props.retainSubmittedQuery(this.props.query);
    } else {
      axios.post('/api/getSearchResults', { state, allStatuses: true, allTypes: true })
        .then(result => {
          console.log(result);
          console.log(result.data.records[0]);
        })
        .catch(error => console.log('Error in query submission', error));
      // this.props.retainSubmittedQuery(this.props.query);
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

export default connect(mapStateToProps, { saveSearchResults })(Searchbar);