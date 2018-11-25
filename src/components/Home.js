import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Searchbar from './Searchbar';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      needs: 'has'
    }
  }

  zillow = () => {
    console.log('clicked');
    const parameters = {
      address: "5069 Iron Horse Trail",
      citystatezip: "Colorado Springs, CO",
      rentzestimate: false
    }
    axios.post('/api/getSinglePropertySearchResults', parameters).then(result => {
      console.log(result.data[0]);
    }).catch(error => console.log(error));
    // if (!this.props.user.location) this.props.history.push('/form');
  }
  
  zillow2 = () => {
    const stateParameters = {
      state: this.props.user.state,
      childtype: "city"
    }
    const cityParameters = {
      state: this.props.user.state,
      city: this.props.user.city,
      childtype: "zipcode"
    }
    axios.post('/api/getRegionChildren', stateParameters)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  }
  testDF = () => {
    axios.post('/api/testDF')
      .then(result => console.log(result))
      .catch(error => console.log('front-end error', error));
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <Searchbar />
        <button
          onClick={this.testDF}>zillow</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Home);
