import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Search from './Search';

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
      address: "2114 Bigelow Ave",
      citystatezip: "Seattle, WA",
      rentzestimate: false
    }
    axios.post('/api/getSearchResults', parameters).then(result => {
      const {address, links, localRealEstate, zestimate, zpid} = result.data[0];
      console.log(address);
      console.log(links);
      console.log(localRealEstate);
      console.log(zestimate);
      console.log(zpid);
    }).catch(error => console.log(error));
    // if (!this.props.user.location) this.props.history.push('/form');
  }
  zillow2 = () => {
    const parameters = {
      state: "CO",
      childtype: "city"
    }
    axios.post('/api/getRegionChildren', parameters).then(result => {
      console.log(result);
    }).catch(error => console.log(error));
  }
  zippo = () => {
    axios.get('http://api.zippopotam.us/us/80013').then(result => {
      console.log(result);
    })
  }

  render() {
    return (
      <div>
        <Search />
        <button onClick={this.zippo}>zillow</button>
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