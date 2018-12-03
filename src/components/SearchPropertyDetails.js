import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateQuery } from '../redux/reducers/query';

class SearchPropertyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {

      // POSSIBLE CITIES FOR USER'S STATE
      citiesDerivedFromState: [],

      // LOCATION
      citiesSelected: [],

      // STATUS
      forSale: false,
      forRent: false,
      isAvailable: true,

      // PROPERTY TYPE
      singleFamily: false,
      condoOrTownhome: false,
      apartment: false,
      newBuild: false,
      commercialOrInvestment: false,
      vacationOrOther: false,

      // PRICE RANGE
      pricePossibleValues: ['50,000', '75,000', '100,000', '125,000', '150,000', '175,000', '200,000', '225,000', '250,000', '275,000', '300,000', '325,000', '350,000', '375,000', '400,000', '425,000', '450,000', '475,000', '500,000', '550,000', '600,000', '650,000', '700,000', '750,000', '800,000', '850,000', '900,000', '950,000', '1M', '1.25M', '1.5M', '1.75M', '2M', '2.25M', '2.5M', '2.75M', '3M', '3.5M', '4M', '4.5M', '5M', '6M', '7M', '8M', '9M', '10M+'],
      minPriceIndex: 0,
      minPrice: '',
      maxPriceIndex: 0,
      maxPrice: '',

      // DATE
      dateListed: "anytime",

      // REQUIRED FIELDS
      locationSet: false,
      statusSet: false,
      typeSet: false,
      priceRangeSet: false,

    }
  }

  getCitiesListFromState = () => {
    // const state = this.props.user.state;
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
    this.setState({ citiesDerivedFromState: ['Aurora', 'Denver', 'Centennial', 'Colorado Springs', 'Pueblo', 'Fort Collins'] })
  }


  updateQuery = () => {
    this.props.updateQuery({
      details: Object.entries(this.state)
        .filter(e => e[1] && e[0] !== "citiesDerivedFromState" && e[0] !== "pricePossibleValues")
    })
    // console.log(...Object.entries(this.state)
    //   .filter(e => e[1] && e[0] !== "citiesDerivedFromState" && e[0] !== "pricePossibleValues"))
  }

  // -------------- LOCATION --------------------- // 
  additionalCity = () => {
    const divChildren = [...document.querySelector('div[name="location"]').children];
    const tgts = [
      divChildren.find(e => e.nodeName === "SELECT" && e.hidden == true),
      divChildren.find(e => e.nodeName === "BUTTON" && e.hidden == true)
    ]
    if (tgts[0] !== undefined) {
      tgts.forEach(e => e.removeAttribute('hidden'))
      tgts[0].focus()
    } else alert('Only 5 cities allowed'); // make better
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
    }, () => this.updateQuery())
  }

  updateCitiesList = (e) => {
    const { value, id } = e.target;
    const citiesList = [...this.state.citiesSelected];
    citiesList[id[+id.length - 1]] = value;
    this.setState({
      citiesSelected: citiesList
    }, () => {
      this.checkLocationRequirement()
      this.updateQuery()
    });
  }

  checkLocationRequirement = () => {
    if (this.state.citiesSelected.some(e => e)) {
      this.setState({
        locationSet: true
      }, () => this.updateQuery());
    } else {
      this.setState({
        locationSet: false
      });
    }
  }


  // -------------- STATUS --------------------- // 
  handleStatusChange = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked
    }, () => this.checkStatusRequirement());
  }

  checkStatusRequirement = () => {
    if (this.state.forSale || this.state.forRent) {
      this.setState({
        statusSet: true
      }, () => this.updateQuery())
    } else this.setState({ statusSet: false })
  }


  // -------------- TYPE --------------------- // 
  handlePropertyTypeChange = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked
    }, () => this.checkTypeRequirement())
  }

  checkTypeRequirement = () => {
    const { singleFamily, condoOrTownhome, apartment, newBuild, commercialOrInvestment, vacationOrOther } = this.state;
    if (singleFamily || condoOrTownhome || apartment || newBuild || commercialOrInvestment || vacationOrOther) {
      this.setState({
        typeSet: true
      }, () => this.updateQuery());
    } else this.setState({ typeSet: false })
  }


  // -------------- PRICE --------------------- // 
  handlePriceChange = (e) => {
    const { name, value } = e.target;
    const index = this.state.pricePossibleValues.findIndex(e => e === value);
    const valueToSet = `${name}Index`;
    this.setState({
      [name]: value,
      [valueToSet]: index
    }, () => this.checkPriceRequirement());
  }

  checkPriceRequirement = () => {
    if (this.state.minPrice || this.state.maxPrice) {
      this.setState({
        priceRangeSet: true
      }, () => this.updateQuery());
    } else this.setState({ priceRangeSet: false })
  }


  // -------------- DATE --------------------- // 
  handleDateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => this.updateQuery());
  }


  componentDidMount() {
    // if (this.props.user.state) this.getCitiesListFromState();
    this.getCitiesListFromState(); // REMOVE ME
    // TODO: else redirect back to form or otherwise get a state for the user
  }

  render() {
    return (
      <div>
        <h2>Property Details</h2>

        <div>
          <div name="location">
            <label for="location">Location</label>
            {/* TODO: THIS PROBABLY SHOULDN'T BE AN INPUT */}
            <input
              name="state"
              placeholder="CA"
              value={this.props.user.state ? this.props.user.state : null}
              disabled />

            <select
              value={this.state.citiesSelected[0]}
              required
              onChange={this.updateCitiesList}
              onFocus={this.updateCitiesList}
              id="cities-list-0">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState
                .map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>

            <select
              hidden
              value={this.state.citiesSelected[1]}
              onChange={this.updateCitiesList}
              onFocus={this.updateCitiesList}
              id="cities-list-1">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState
                .map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(1)} id="cities-button-1">
              <i>-</i>
            </button>

            <select
              hidden
              value={this.state.citiesSelected[2]}
              onChange={this.updateCitiesList}
              onFocus={this.updateCitiesList}
              id="cities-list-2">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState
                .map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(2)} id="cities-button-2">
              <i>-</i>
            </button>

            <select
              hidden
              value={this.state.citiesSelected[3]}
              onChange={this.updateCitiesList}
              onFocus={this.updateCitiesList}
              id="cities-list-3">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState
                .map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(3)} id="cities-button-3">
              <i>-</i>
            </button>

            <select
              hidden
              value={this.state.citiesSelected[4]}
              onChange={this.updateCitiesList}
              onFocus={this.updateCitiesList}
              id="cities-list-4">
              <option value="" selected disabled hidden>select city</option>
              [{this.state.citiesDerivedFromState
                .map((e, i) => e = <option key={i} value={e}>{e}</option>)}]
            </select>
            <button hidden onClick={(id) => this.removeCityFromList(4)} id="cities-button-4">
              <i>-</i>
            </button>

            <button onClick={this.additionalCity}>
              <i>+</i>
            </button>
          </div>




          <div name="property-details">
            <label for="property-details">Property Details</label>

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
              <label for="price">Price</label>
              <section>
                <label for="minPrice">Min</label>
                <select name="minPrice" onChange={this.handlePriceChange} value={this.state.minPrice}>
                  <option value="noMin">No min</option>
                  {[this.state.pricePossibleValues
                    .filter((e, i) => this.state.maxPriceIndex > 0 ? i < this.state.maxPriceIndex : e)
                    .map((elem, index) => <option key={index} value={elem}>${elem}</option>)]}
                </select>
                <label for="maxPrice">Max</label>
                <select name="maxPrice" onChange={this.handlePriceChange} value={this.state.maxPrice}>
                  <option value="noMax">No max</option>
                  {[this.state.pricePossibleValues
                    .filter((e, i) => this.state.minPriceIndex > -1 ? i > this.state.minPriceIndex : e)
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
            </div>

            <div>
              <label for="dates">Date Added</label>
              <section name="dates">
                <label for="today">Today</label>
                <input type="radio" name="dateListed" onChange={this.handleDateChange} value="today" />
                <label for="week">Last 7 Days</label>
                <input type="radio" name="dateListed" onChange={this.handleDateChange} value="week" />
                <label for="month">Last 30 Days</label>
                <input type="radio" name="dateListed" onChange={this.handleDateChange} value="month" />
                <label for="anytime">Anytime</label>
                <input type="radio" name="dateListed" onChange={this.handleDateChange} value="anytime" defaultChecked />
              </section>
            </div>
          </div>

          {/* <button onClick={() => this.props.submitPropertySearch(this.state)}>SEARCH</button> */}
        </div>
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
export default connect(mapStateToProps, { updateQuery })(SearchPropertyDetails);
