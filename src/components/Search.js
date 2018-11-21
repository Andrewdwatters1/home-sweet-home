import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // populated with possible list of cities for user's state
      citiesDerivedFromState: [],
      // cities user has selected for query
      citiesSelected: [],
      bedroomsMin: "",
      bedroomsMin: "",
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


  setBedroomsMin = (e) => {
    this.setState({
      bedroomsMin: e.target.value
    })
  }

  setBedroomsMax = (e) => {
    this.setState({
      bedRoomsMax: e.target.value
    })
  }

  getCitiesListFromState = () => {
    const state = this.props.user.state || this.props.user.stateReq;
    axios.post('/api/getRegionChildren', {
      state: state,
      childtype: "city"
    }).then(result => {
      this.setState({
        citiesDerivedFromState: [...result.data.response.list.region]
          .map(e => e = e.name[0])
          .sort()
      })
    }).catch(error => console.log(error));
  }

  // DISPLAYS THE NEXT CITY SELECT INPUT TO POPULATE CITIES QUERY ARRAY
  additionalCity = () => {
    const nextInput = document.querySelectorAll('select[hidden]')[0];
    if (nextInput) nextInput.removeAttribute('hidden');
  }

  testDF = () => {
    axios.post('/api/testDF')
      .then(result => console.log(result))
      .catch(error => console.log('front-end error', error));
  }

  componentDidMount() {
    if (this.props.user.state || this.props.user.stateReq) this.getCitiesListFromState();
    // TODO: else redirect back to form or otherwise get a state for the user
  }

  render() {

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

            {/* TODO: THIS PROBABLY SHOULDN'T BE AN INPUT */}
            <input
              name="state"
              placeholder="CA"
              value={this.props.user.state ? this.props.user.state.toUpperCase() : this.props.user.stateReq ? this.props.user.stateReq.toUpperCase() : null}
              disabled />

            <select
              value={this.state.citiesSelected[0]}
              id="cities-selected-0">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            <select
              hidden
              value={this.state.citiesSelected[1]}
              name="cities-selected-1">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            <select
              hidden
              value={this.state.citiesSelected[2]}
              name="cities-selected-2">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            <select
              hidden
              value={this.state.citiesSelected[3]}
              name="cities-selected-3">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            <select
              hidden
              value={this.state.citiesSelected[4]}
              name="cities-selected-4">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            {/* TODO: CURRENTLY DOES NOTHING */}
            <button onClick={this.additionalCity}>
              <i>+</i>
            </button>


            {/* TODO: MAX MUST BE GREATER THAN MIN, DISABLE OR HIDE MAX OPTIONS <= MIN OPTIONS */}
            <label for="bedrooms"># bedrooms</label>
            <section name="bedrooms">
              <select name="bedrooms-min" onChange={this.setBedroomsMin}>
                <option value="" selected disabled hidden>min</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
              <select name="bedrooms-max" onChange={this.setBedroomsMax}>
                <option value="" selected disabled hidden>max</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </section>



            <button onClick={this.testDF}>Search</button>
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
