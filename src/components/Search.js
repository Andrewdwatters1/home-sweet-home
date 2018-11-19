import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: [],
      citiesDerivedFromZip: [],
      statesDerivedFromZip: []
    }
  }

  // ex multi field query w/ AND: query": "city:Austin AND numBathroom:2"
  //    note: can also use OR
  // ex city "query": "city:(Austin OR Houston OR Dallas)"
  // ex query to ensure all values have price: "query": "prices:*"
  // ex query to search date range: "query": "dateAdded:[2017-01-01 TO 2017-02-01]"
  // ex query to search unbounded date range: "query": "dateAdded:[2017-01-01 TO *]"

  // zillow = () => {
  //   console.log('clicked');
  //   const parameters = {
  //     address: "5069 Iron Horse Trail",
  //     citystatezip: "Colorado Springs, CO",
  //     rentzestimate: false
  //   }
  //   axios.post('/api/getSearchResults', parameters).then(result => {
  //     const { address, links, localRealEstate, zestimate, zpid } = result.data[0];
  //     console.log(address);
  //     console.log(links);
  //     console.log(localRealEstate);
  //     console.log(zestimate);
  //     console.log(zpid);
  //   }).catch(error => console.log(error));
  //   // if (!this.props.user.location) this.props.history.push('/form');
  // }

  // zillow2 = () => {
  //   const stateParameters = {
  //     state: this.props.user.state,
  //     childtype: "city"
  //   }
  //   const cityParameters = {
  //     state: this.props.user.state,
  //     city: this.props.user.city,
  //     childtype: "zipcode"
  //   }
  //   axios.post('/api/getRegionChildren', cityParameters).then(result => {
  //     console.log(result);
  //   }).catch(error => console.log(error));
  // }





  // styles input if valid
  isInputValid = (tgt, bool) => {
    if (bool) {
      tgt.classList.add('form-valid')
      tgt.classList.remove('form-invalid')
    } else {
      tgt.classList.remove('form-valid')
      tgt.classList.add('form-invalid')
    }
  }

  testDF = () => {
    axios.post('/api/testDF')
      .then(result => console.log(result))
      .catch(error => console.log('front-end error', error));
  }

  validateCityInput = (e) => {
    e.preventDefault()
    const {
      name,
      value
    } = e.target;

    const zipRegExp = /^\d{5}$/;
    const cityRegExp = /^[A-Za-z\.\,\ ]+$/;

    if (zipRegExp.test(value)) {
      this.isInputValid(e.target, true);
      axios.post('/api/getCityFromZip', {
        value
      }).then(result => {
        this.setState({
          citiesDerivedFromZip: [...this.state.citiesDerivedFromZip, result.data['place name']],
          statesDerivedFromZip: [...this.state.statesDerivedFromZip, result.data['state abbreviation']]
        });
      });
    } else if (cityRegExp.test(value)) {
      // TODO MAKE THIS WORK.

    } else this.isInputValid(e.target, false);
  }


  render() {
    console.log(this.state.cities);

    //TODO get this formatted correctly
    return (
      <div style={{
        display: "flex",
        height: "160px",
        backgroundColor: "red"
      }}>
        <i>Logo</i>
        <h1>Headed Home</h1>
        <div>
          <div class="location-input">
            {/* TODO these should all be select dropdown menus */}
            {/* use zillow2 from line 44 passing stateParameters */}

            <input name="cities[1]"
              placeholder="Enter City"
              onBlur={this.validateCityInput}
              value={this.state.cities[0]} />

            <input name="cities[2]"
              hidden placeholder="Enter City"
              onBlur={this.validateCityInput}
              value={this.state.cities[0]} />

            <input hidden placeholder="Enter City"
              onBlur={this.validateCityInput}
              value={this.state.cities[0]} />

            <input hidden placeholder="Enter City"
              onBlur={this.validateCityInput}
              value={this.state.cities[0]} />

            <input hidden placeholder="Enter City"
              onBlur={this.validateCityInput}
              value={this.state.cities[0]} />

            <button onClick={this.addCity}>
              <i>+</i>
            </button>

          </div>
        </div>
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
