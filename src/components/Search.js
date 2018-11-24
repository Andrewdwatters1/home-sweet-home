import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {

      // POSSIBLE CITIES FOR USER'S STATE
      citiesDerivedFromState: [],

      // ----- LOCATION
      citiesSelected: [],
      bedroomsMin: "",
      bedroomsMin: "",

      // ----- PROPERTY DETAILS
      // STATUS
      forSale: false,
      forRent: false,
      isAvailable: false,
      // PROPERTY TYPE
      singleFamily: false,
      condoOrTownhome: false,
      apartment: false,
      newBuild: false,
      commercialOrInvestment: false,
      vacationOrOther: false,
      // PRICE RANGE
      pricePossibleValues: ['50,000', '75,000', '100,000', '125,000', '150,000', '175,000', '200,000', '225,000', '250,000', '275,000', '300,000', '325,000', '350,000', '375,000', '400,000', '425,000', '450,000', '475,000', '500,000', '550,000', '600,000', '650,000', '700,000', '750,000', '800,000', '850,000', '900,000', '950,000', '1M', '1.25M', '1.5M', '1.75M', '2M', '2.25M', '2.5M', '2.75M', '3M', '3.5M', '4M', '4.5M', '5M', '6M', '7M', '8M', '9M', '10M+'],
      // maxPricePossibleValues: ['50,000', '75,000', '100,000', '125,000', '150,000', '175,000', '200,000', '225,000', '250,000', '275,000', '300,000', '325,000', '350,000', '375,000', '400,000', '425,000', '450,000', '475,000', '500,000', '550,000', '600,000', '650,000', '700,000', '750,000', '800,000', '850,000', '900,000', '950,000', '1M', '1.25M', '1.5M', '1.75M', '2M', '2.25M', '2.5M', '2.75M', '3M', '3.5M', '4M', '4.5M', '5M', '6M', '7M', '8M', '9M', '10M+'],
      minPriceIndex: 0,
      minPrice: '',
      maxPriceIndex: 0,
      maxPrice: '',
      // REQUIRED FIELDS
      statusSet: false,
      typeSet: false,
      priceRangeSet: false,


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
  // PROPERTY STATUS
  handleStatusChange = (e) => {
    const { name, checked } = e.target;
    const childInputs = [...document.querySelector('section[name="status"]').children]
      .filter(e => e.nodeName === 'INPUT');

    this.setState({
      [name]: checked
    }, () => this.checkStatusRequirement(childInputs));
  }

  checkStatusRequirement = (children) => {
    children.pop();
    if (children.some(e => e.value === 'true')) this.setState({ statusSet: true })
    else this.setState({ statusSet: false })
  }

  // PROPERTY TYPE
  handlePropertyTypeChange = (e) => {
    const { name, checked } = e.target;
    const childInputs = [...document.querySelector('section[name="property-type"]').children]
      .filter(e => e.nodeName === 'INPUT');
    this.setState({
      [name]: checked
    }, () => this.checkTypeRequirement(childInputs))
  }
  checkTypeRequirement = (children) => {
    if (children.some(e => e.value === 'true')) this.setState({ typeSet: true })
    else this.setState({ typeSet: false })
  }

  // PRICE RANGE

  handlePriceChange = (e) => {
    const { name, value } = e.target;
    const index = this.state.pricePossibleValues.findIndex(e => e === value);
    const valueToSet = `${name}Index`;
    console.log(valueToSet, ':', index);
    this.setState({
      [name]: value,
      [valueToSet]: index
    }, () => {
      console.log('min price index', this.state.minPriceIndex);
      console.log('max price index', this.state.maxPriceIndex);
    })
  }

  // handleMaxPriceChange = (e) => {

  // }
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
    // console.log('state isssssssssssss', this.state);
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
                <label for="forSale">For Sale</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="forSale" value={this.state.forSale} />
                <label for="forRent">For Rent</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="forRent" value={this.state.forRent} />
                <label for="isAvailable">Available Properties Only</label>
                <input type="checkbox" onChange={this.handleStatusChange} name="isAvailable" value={this.state.isAvailable} defaultChecked />
              </section>
            </div>

            <div name="price">
              {/* PRICES */}
              <label for="price">Price</label>
              <section>
                <label for="minPrice">Min</label>
                <select name="minPrice" onChange={this.handlePriceChange} value={this.state.minPrice}>
                  <option value="noMin">No min</option>
                  {[this.state.pricePossibleValues
                    .filter((e, i) => this.state.maxPriceIndex > -1 ? i < this.state.maxPriceIndex : e)
                    .map((elem, index) => <option key={index} value={elem}>${elem}</option>)]}
                </select>
                <label for="maxPrice">Max</label>
                <select name="maxPrice" onChange={this.handlePriceChange} value={this.state.maxPrice}>
                  <option value="noMax">No max</option>
                  {[this.state.pricePossibleValues
                    .filter((e, i) => this.state.minPriceIndex > 0 ? i > this.state.minPriceIndex : e)
                    .map((elem, index) => <option key={index} value={elem}>${elem}</option>)]}
                </select>
              </section>
            </div>

            <div>
              <label for="property-type">Property Type</label>
              <section name="property-type">
                <label for="singleFamily">Single Family</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="singleFamily" value={this.state.singleFamily} />
                <label for="condoOrTownhome">Condo/Townhome</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="condoOrTownhome" value={this.state.condoOrTownhome} />
                <label for="apartment">Apartment/Room</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="apartment" value={this.state.apartment} />
                <label for="newBuild">New Build</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="newBuild" value={this.state.newBuild} />
                <label for="commercialOrInvestment">Commercial/Investment</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="commercialOrInvestment" value={this.state.commercialOrInvestment} />
                <label for="land">Land</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="land" value={this.state.land} />
                <label for="vacationOrOther">Vacation/Other</label>
                <input type="checkbox" onChange={this.handlePropertyTypeChange} name="vacationOrOther" value={this.state.vacationOrOther} />
              </section>
              {/* 
              SINGLE FAMILY HOME
              CONDO/TOWNHOME
              APARTMENT/SINGLE UNIT
              NEW BUILD
              COMMERCIAL/RENTAL/INVESTMENT
              LAND
              VACATION/OTHER
               */}
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
