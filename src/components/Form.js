import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { updateUser, updateUserLocation } from '../redux/reducers/user';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitEnabled: false,
      requiredModal: false,
      requiredValid: false,
      lat: '',
      long: '',
      zip: '',
      city: '',
      state: '',
      stateReq: ''
    }
  }

  validateName = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const nameRegExp = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    if (nameRegExp.test(value)) this.inputIsValid(e)
    else this.inputIsInvalid(name);
  }

  validateEmail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if (emailRegExp.test(value)) this.inputIsValid(e)
    else this.inputIsInvalid(name);
  }

  validateZip = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ zip: value })

    const zipRegExp = /^\d{5}$/;
    if (zipRegExp.test(value)) {
      this.inputIsValid(e);
      axios.post('/api/getCityFromZip', { value })
        .then(result => {
          this.setState({
            city: result.data['place name'],
            state: result.data['state abbreviation']

          }, () => {
            this.props.updateUserLocation({ city: this.state.city })
            this.props.updateUserLocation({ state: this.state.state })
            document.querySelectorAll(`input[name="city"]`)[0].classList.add('form-valid');
            document.querySelectorAll(`input[name="state"]`)[0].classList.add('form-valid');
          })
        })
    } else this.inputIsInvalid(name);
  }

  validateCity = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    this.setState({ city: value });

    const cityRegExp = /^[A-Za-z\.\,\ ]+$/;
    if (cityRegExp.test(value)) this.inputIsValid(e);
    else this.inputIsInvalid(name);
  }

  validateState = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'state') this.setState({ state: value.toUpperCase() });
    else if (name === 'stateReq') this.setState({ stateReq: value.toUpperCase() });

    const stateRegExp = /^A[LKSZRAEP]$|^C[AOT]$|^D[EC]$|^F[LM]$|^G[AU]$|^HI$|^I[ADLN]$|^K[SY]$|^LA$|^M[ADEHINOPST]$|^N[CDEHJMVY]$|^O[HKR]$|^P[ARW]$|^RI$|^S[CD]$|^T[NX]$|^UT$|^V[AIT]$|^W[AIVY]$/;
    if (stateRegExp.test(value.toUpperCase())) this.inputIsValid(e);
    else this.inputIsInvalid(name);
  }

  inputIsValid = (e) => {
    const { name, value } = e.target;

    name === 'state' || name === 'stateReq' ?
      this.props.updateUser({ target: { name: 'state', value: value.toUpperCase() } })
      :
      this.props.updateUser(e);

    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-valid')
    tgtInput.classList.remove('form-invalid')

    this.setState({ submitEnabled: true })
  }

  inputIsInvalid = name => {
    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-invalid');
    tgtInput.classList.remove('form-valid');

    this.setState({ submitEnabled: false })
  }

  // SEND USER'S INFO TO DB AND CAPTURE/GIVE COOKIE FOR FUTURE VISITS
  submitForm = (e) => {
    e.preventDefault();
    const { first, last, email, city, state, zip } = this.props.user;
    if (this.state.submitEnabled && first && last && email && city && state && zip) {
      this.props.history.push('/');
      // axios.post('/api/auth')
    }
  }

  skipForm = (e) => {
    e.preventDefault();
    this.setState({
      requiredModal: !this.state.requiredModal
    })
  }

  getLocationInfo = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    axios.post('/api/getLocationInfo', { lat, long })
      .then(result => {
        this.setState({
          zip: result.data[0].address_components[7].long_name,
          city: result.data[0].address_components[3].long_name,
          state: result.data[0].address_components[5].short_name

        }, () => {
          const { zip, city, state } = this.state;
          this.props.updateUserLocation({ zip, city, state })

          const tgts = [
            document.querySelectorAll(`input[name="zip"]`)[0],
            document.querySelectorAll(`input[name="city"]`)[0],
            document.querySelectorAll(`input[name="state"]`)[0]
          ]

          tgts.forEach((e) => e.classList.add('form-valid'))
        })
      })
      .catch(error => console.log('error in geolocation', error));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getLocationInfo);
    }
  }

  render() {
    const { first, last, email, city, state, zip } = this.props.user;

    return (
      <div className="form-background" >
        <div className="form inner" >

          <form id="initial" >
            <label for="first"> First Name</label>
            <input
              type="text"
              name="first"
              onBlur={this.validateName}
              placeholder="John" />

            <label for="last">Last Name </label>
            <input
              type="text"
              name="last"
              onBlur={this.validateName}
              placeholder="Doe" />

            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              onBlur={this.validateEmail}
              placeholder="email@domain.com" />

            <div>
              <div>
                <label for="zip">Zip</label>
                <input
                  type="text"
                  name="zip"
                  onChange={this.validateZip}
                  placeholder="90210"
                  value={this.state.zip} />
              </div>

              <div>
                <label for="city">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={this.validateCity}
                  placeholder="Lovely"
                  value={this.state.city} />

                <label for="state">State</label>
                <input
                  type="text"
                  name="state"
                  onChange={this.validateState}
                  placeholder="CA"
                  value={this.state.state.toUpperCase()} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!this.state.submitEnabled && first && last && email && city && state && zip}
              onClick={this.submitForm} >
              Search
            </button>

            <button onClick={this.skipForm}>Skip >>></button>

            {this.state.requiredModal &&
              <div>
                <p>State is required</p>
                <button onClick={this.skipForm}>x</button>
                <input
                  type="text"
                  name="stateReq"
                  onChange={this.validateState}
                  placeholder="CA"
                  value={this.state.stateReq.toUpperCase()}
                  autoFocus />
                <Link to="/" disabled={!this.state.submitEnabled}><button>Search</button></Link>
              </div>
            }
          </form>
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
export default connect(mapStateToProps, { updateUser, updateUserLocation })(Form);
