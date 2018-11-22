import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {

      // POSSIBLE CITIES FOR USER'S STATE
      citiesDerivedFromState: [],

      // LOCATION
      citiesSelected: [],
      bedroomsMin: "",
      bedroomsMin: "",

      // PROPERTY DETAILS
      forSale: false,
      forRent: false,
      isAvailable: false,

      // REQUIRED FIELDS
      statusSet: false


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
  //   axios.post('/api/getSinglePropertySearchResults', parameters).then(result => {
  //     const { address, links, localRealEstate, zestimate, zpid } = result.data[0];
  //     console.log(address);
  //     console.log(links);
  //     console.log(localRealEstate);
  //     console.log(zestimate);
  //     console.log(zpid);
  //   }).catch(error => console.log(error));
  //   // if (!this.props.user.location) this.props.history.push('/form');
  // }







  getCitiesListFromState = () => {
    // const state = this.props.user.state || this.props.user.stateReq;
    // axios.post('/api/getRegionChildren', {
    //   state: state,
    //   childtype: "city"
    // }).then(result => {
    //   this.setState({
    //     citiesDerivedFromState: [...result.data.response.list.region]
    //       .map(e => e = e.name[0])
    //       .sort()
    //   })
    // }).catch(error => console.log(error));
    this.setState({
      citiesDerivedFromState: ['Aurora', 'Denver', 'Centennial', 'Colorado Springs', 'Pueblo', 'Fort Collins']
    })
  }



  // -------------- LOCATION --------------------- // 
  additionalCity = () => {
    const divChildren = [...document.querySelector('div[name="location"]').children];
    const tgts = [
      divChildren.find(e => e.nodeName === "SELECT" && e.hidden == true),
      divChildren.find(e => e.nodeName === "BUTTON" && e.hidden == true)
    ]

    if (tgts[0] !== undefined) tgts.forEach(e => e.removeAttribute('hidden'))
    else alert('Only 5 cities allowed'); // make better
  }

  removeCityFromList = id => {
    const tgts = [
      document.getElementById(`cities-list-${id}`),
      document.getElementById(`cities-button-${id}`)
    ];
    tgts.forEach(e => e.setAttribute('hidden', true));

    const citiesList = [...this.state.citiesSelected];
    citiesList.splice(id, 1);
    this.setState({
      citiesSelected: citiesList
    })
  }

  updateCitiesList = (e) => {
    const { value, id } = e.target;
    const citiesList = [...this.state.citiesSelected];
    citiesList[id[+id.length - 1]] = value;
    this.setState({ citiesSelected: citiesList });
  }
  // -------------- LOCATION --------------------- // 






  // -------------------- PROPERTY DETAILS -------------- // 
  handleStatusChange = (e) => {
    const { name, checked } = e.target;
    const childInputs = [...document.querySelector('section[name="status"]').children]
      .filter(e => e.nodeName === 'INPUT');

    if (name === 'for-sale') {
      this.setState({
        forSale: checked
      }, () => this.checkStatusRequirement(childInputs));
    } else if (name === 'for-rent') {
      this.setState({
        forRent: checked
      }, () => this.checkStatusRequirement(childInputs));
    } else if (name === 'available') {
      this.setState({
        isAvailable: checked
      }, () => this.checkStatusRequirement(childInputs));
    }
  }

  checkStatusRequirement = (children) => {
    children.pop();
    if (children.some(e => e.value === 'true')) this.setState({ statusSet: true })
    else this.setState({ statusSet: false })
  }

  // TODO: WORK ME AFTER PROPERTY DETAILS SECTION IS FINISHED
  setBedroomsMin = (e) => {
    const { name, value } = e.target;
    const max = document.querySelector('#bedrooms-max');
    console.log(max);
    // if value === 3 => max innerHTML = 4, 5
    // else if value === 1 => max inner HTML = 2, 3, 4, 5
    this.setState({
      bedroomsMin: value
    })
  }

  setBedroomsMax = (e) => {
    this.setState({
      bedRoomsMax: e.target.value
    })
  }
  // -------------------- PROPERTY DETAILS -------------- // 





  testDF = () => {
    axios.post('/api/testDF')
      .then(result => console.log(result))
      .catch(error => console.log('front-end error', error));
  }

  componentDidMount() {
    // if (this.props.user.state || this.props.user.stateReq) this.getCitiesListFromState();
    this.getCitiesListFromState(); // REMOVE ME
    // TODO: else redirect back to form or otherwise get a state for the user
  }

  render() {
    console.log('state isssssssssssss', this.state);
    return (
      <div style={{
        display: "flex",
        height: "160px",
        backgroundColor: "red"
      }}>
        <i>Logo</i>
        <h1>Home Sweet Home</h1>

        <div>

          <div name="location">
            <label for="location">Location</label>
            {/* TODO: THIS PROBABLY SHOULDN'T BE AN INPUT */}
            <input
              name="state"
              placeholder="CA"
              value={this.props.user.state ? this.props.user.state.toUpperCase() : this.props.user.stateReq ? this.props.user.stateReq.toUpperCase() : null}
              disabled />

            <select
              value={this.state.citiesSelected[0]}
              required
              onChange={this.updateCitiesList}
              id="cities-list-0">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <select
              hidden
              value={this.state.citiesSelected[1]}
              onChange={this.updateCitiesList}
              id="cities-list-1">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(1)} id="cities-button-1"><i>-</i></button>
            <select
              hidden
              value={this.state.citiesSelected[2]}
              onChange={this.updateCitiesList}
              id="cities-list-2">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(2)} id="cities-button-2"><i>-</i></button>
            <select
              hidden
              value={this.state.citiesSelected[3]}
              onChange={this.updateCitiesList}
              id="cities-list-3">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(3)} id="cities-button-3"><i>-</i></button>
            <select
              hidden
              value={this.state.citiesSelected[4]}
              onChange={this.updateCitiesList}
              id="cities-list-4">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState.map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(4)} id="cities-button-4"><i>-</i></button>

            {/* TODO: CURRENTLY DOES NOTHING */}
            <button onClick={this.additionalCity}>
              <i>+</i>
            </button>
          </div>




          <div name="property-details">
            <label for="property-details">Propety Details</label>

            <div>
              <label for="status">Status</label>
              <section name="status">
                <label for="for-sale">For Sale</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="for-sale" value={this.state.forSale} />
                <label for="for-rent">For Rent</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="for-rent" value={this.state.forRent} />
                <label for="available">Available Properties Only</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="available" value={this.state.isAvailable} defaultChecked/>
              </section>
            </div>

            <div>
              {/* PRICES */}
            </div>

            <div>
              {/* PROPERTY TYPE */}
            </div>

            <div>
              {/* DATE ADDED */}
            </div>

            <div>
              {/* FEES/HOA/ETC */}
            </div>

          </div>





          {/* TODO: MAX MUST BE GREATER THAN MIN, DISABLE OR HIDE MAX OPTIONS <= MIN OPTIONS */}
          <label for="bedrooms"># bedrooms</label>
          <section name="bedrooms">
            <select name="bedrooms-min" onChange={this.setBedroomsMin} id="bedrooms-min">
              [<option value="" selected disabled hidden>min</option>
              <option value="Studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>]
              </select>
            <select name="bedrooms-max" onChange={this.setBedroomsMax} id="bedrooms-min">
              [<option value="" selected disabled hidden>max</option>
              <option value="Studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>]
              </select>
          </section>



          <button onClick={this.testDF}>Search</button>
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
